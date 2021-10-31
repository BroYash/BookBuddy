import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Footer, { footerIcons } from "../components/Footer";
import { auth } from "../firebase";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        logo={require("../assets/Book-Buddy-logos/profile.png")}
      />
      <Image
        style={styles.avatar}
        source={{ uri: auth?.currentUser?.photoURL }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{auth?.currentUser?.displayName}</Text>
          <Text style={styles.info}>Developer/Book Enthusiast</Text>
          <Text style={styles.description}>
            This is where the user's description goes. In this section they can
            talk about their book interests, their research topics they have
            studied or anything else that they want to share.
          </Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{ color: "white" }}>Upload Research</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer navigation={navigation} icons={footerIcons} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center",
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    color: "black",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "darkred",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "black",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "darkred",
  },
});
