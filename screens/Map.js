import * as Location from "expo-location";
import React, { useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import GlobalStyles from "../style/GlobalStyles";

export default function Map() {
  const [markers, setMarkers] = useState([]); // alle gemte markører
  const [region, setRegion] = useState({
    latitude: 56.26392, // default = Danmark
    longitude: 9.501785,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(true);
  const styles = GlobalStyles.map;

  // Henter markører fra AsyncStorage
  const getMarkers = async () => {
    try {
      const raw = await AsyncStorage.getItem("markers");
      const list = raw ? JSON.parse(raw) : [];
      setMarkers(list);

      // Flyt kortet til den senest gemte markør
      const latest = list.at(-1);
      if (latest) {
        setRegion((r) => ({
          ...r,
          latitude: latest.latitude,
          longitude: latest.longitude,
        }));
      }
    } catch (e) {
      console.error("Error retrieving markers", e);
    }
  };

  // Henter brugerens nuværende lokation (kræver tilladelse)
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;
    const { coords } = await Location.getCurrentPositionAsync({});
    setRegion((r) => ({
      ...r,
      latitude: coords.latitude,
      longitude: coords.longitude,
    }));
  };

  // Kører hver gang man går ind på Map-tabben
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      Promise.all([getMarkers(), getLocation()]).finally(() =>
        setLoading(false)
      );
    }, [])
  );

  // Loader-indikator mens data hentes
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region} // styrer kortets position
        onRegionChangeComplete={setRegion}
        showsUserLocation
        // Mulighed: long-press for at tilføje ny markør direkte på kortet
        onLongPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          const newMarker = {
            id: Date.now().toString(),
            latitude,
            longitude,
            title: "Drop pin",
          };
          const next = [...markers, newMarker];
          setMarkers(next);
          AsyncStorage.setItem("markers", JSON.stringify(next));
        }}
      >
        {/* Tegn alle markører på kortet */}
        {markers.map((m) => (
          <Marker
            key={m.id ?? `${m.latitude},${m.longitude}`}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            title={m.title ?? "Marker"}
            tracksViewChanges={false}
            pinColor="#FF0000"
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}
