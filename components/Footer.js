import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { auth } from "../firebase";
export const footerIcons = [
  {
    name: "Home",
    img: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
  },
  {
    name: "Shop",
    img: "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png",
  },
  {
    name: "Profile",
    img: "https://img.icons8.com/fluency-systems-filled/96/ffffff/user-male-circle.png",
  },
];
const Footer = ({ icons, navigation }) => {
  const navigate = (name) => {
    navigation.navigate(name);
  };

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => navigate(icon.name)}>
      <Image source={{ uri: icon.img }} style={[styles.icon]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {icons.map((icon, index) => (
            <Icon key={index} icon={icon} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  wrapper: { position: "absolute", bottom: "0%", zIndex: 999, width: "100%" },
  container: {
    padding: 10,
    backgroundColor: "black",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginEnd: 20,
    marginStart: 20,
  },
  icon: {
    width: 30,
    height: 30,
    padding: 10,
  },
});
