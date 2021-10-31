import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { auth } from "../firebase";

const Header = (props) => {
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        props.navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addItem = () => {
    props.navigation.navigate("AddItem");
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={props.logo}></Image>
      <View style={styles.rightIconsContainer}>
        {props.title === "Shop" ? (
          <TouchableOpacity onPress={addItem}>
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/ios/100/000000/plus-2-math.png",
              }}
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={() => props.navigation.navigate("Chat")}>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/ios/50/000000/facebook-messenger--v1.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/60/000000/logout-rounded--v1.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  rightIconsContainer: {
    flexDirection: "row",
  },
  logo: {
    width: 130,
    height: 30,
    resizeMode: "contain",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
});

export default Header;
