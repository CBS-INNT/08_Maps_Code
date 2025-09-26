import { StyleSheet } from "react-native";

const GlobalStyles = {
  home: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    bcg: {
      padding: 80,
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 80,
    },
    input: {
      height: 40,
      borderColor: "lightgray",
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      width: "90%",
      borderRadius: 20,
      backgroundColor: "#f9f9f9",
    },
    button: {
      backgroundColor: "#FF0000",
      padding: 10,
      borderRadius: 20,
      alignItems: "center",
      width: "90%",
      marginTop: 40,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 50,
      resizeMode: "contain",
    },
  }),

  map: StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  }),
};

export default GlobalStyles;
