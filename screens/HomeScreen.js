import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Footer, { footerIcons } from "../components/Footer";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        logo={require("../assets/Book-Buddy-logos/txtlogo.png")}
      />
      <Text style={styles.mainContent}>Not implemented yet</Text>
      <Footer icons={footerIcons} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    top: "50%",
    left: "25%",
    right: 0,
    bottom: 0,
    position: "absolute",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default HomeScreen;
