import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddNewItem from "../components/AddNewItem";
import { SafeAreaView } from "react-native-safe-area-context";

const AddItemScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddNewItem navigation={navigation}></AddNewItem>
    </SafeAreaView>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({});
