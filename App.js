import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./screens/Home";
import Map from "./screens/Map";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // Farver for aktiv/inaktiv tab
            tabBarActiveTintColor: "#FF0000",
            tabBarInactiveTintColor: "gray",
            // Vælg ikon ud fra tab-navn
            tabBarIcon: ({ color, size }) => {
              const iconName = route.name === "Home" ? "home" : "map";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false, // skjul header
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Map" component={Map} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}