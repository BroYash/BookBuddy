import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Footer, { footerIcons } from "../components/Footer";
import Item from "../components/Item";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../firebase";
const ShopScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("posts").onSnapshot((snapshot) =>
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        logo={require("../assets/Book-Buddy-logos/shop.png")}
        title="Shop"
      />
      <ScrollView>
        {items.map(
          ({
            id,
            data: {
              author,
              profilePicture,
              description,
              imageUrl,
              price,
              title,
              user,
            },
          }) => (
            <Item
              navigation={navigation}
              author={author}
              description={description}
              profilePicture={profilePicture}
              imageUrl={imageUrl}
              price={price}
              title={title}
              user={user}
              key={id}
            ></Item>
          )
        )}
      </ScrollView>
      <View style={{ paddingBottom: 45 }}></View>
      <Footer icons={footerIcons} navigation={navigation} />
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
