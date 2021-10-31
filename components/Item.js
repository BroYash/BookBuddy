import React from "react";
import { StyleSheet, Button, Text, Image, View } from "react-native";
import { Divider } from "react-native-elements";
import { db } from "../firebase";
const Items = ({
  author,
  profilePicture,
  description,
  imageUrl,
  price,
  title,
  user,
  navigation,
}) => {
  const createChat = async (user) => {
    await db
      .collection("chats")
      .add({
        chatName: user,
        chatImageUrl: profilePicture,
      })
      .then(() => {
        navigation.replace("Chat");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Divider width={1} orientation="vertical" />
      <ItemHeader profilePicture={profilePicture} user={user} />
      <ItemImage imageUrl={imageUrl} />
      <ItemFooter
        title={title}
        description={description}
        author={author}
        price={price}
      />
      <Button
        onPress={() => createChat(user)}
        color="darkred"
        title="Message Seller"
      ></Button>
    </View>
  );
};
const ItemHeader = ({ profilePicture, user }) => (
  <View style={styles.itemHeader}>
    <View style={styles.innerItemHeader}>
      <Image source={{ uri: profilePicture }} style={styles.profile} />
      <Text style={styles.username}>{user}</Text>
    </View>
  </View>
);

const ItemImage = ({ imageUrl }) => (
  <View style={styles.itemImage}>
    <Image source={{ uri: imageUrl }} style={styles.image} />
  </View>
);

const ItemFooter = ({ author, description, price, title }) => (
  <View>
    <View style={styles.itemFooter}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
      <Text
        style={{
          marginTop: 2,
          color: "darkred",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        ${price}
      </Text>
    </View>
    <View style={styles.other}>
      <Text style={{ fontStyle: "italic", fontSize: 16 }}>{author}</Text>
      <Text style={{ fontSize: 16 }}>{description}</Text>
    </View>
  </View>
);
export default Items;

const styles = StyleSheet.create({
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },

  innerItemHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8504",
  },
  username: {
    color: "black",
    marginLeft: 5,
    fontWeight: "700",
  },
  itemImage: {
    width: "100%",
    height: 250,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  itemFooter: {
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-between",
  },
  other: {
    margin: 10,
  },
});
