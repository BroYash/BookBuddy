import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth, db } from "../firebase";
const AddNewItem = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <List navigation={navigation} />
    </View>
  );
};

const List = ({ navigation }) => {
  const [author, setAuthor] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [description, setDescription] = React.useState("");

  const submitPost = async () => {
    await db
      .collection("posts")
      .add({
        user: auth.currentUser.displayName,
        profilePicture: auth.currentUser.photoURL,
        author: author,
        price: price,
        title: title,
        imgUrl: imgUrl,
        description: description,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.inputContainer}>
      <Input
        placeholder="Title"
        autoFocus
        type="text"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Input
        placeholder="Author"
        autoFocus
        type="text"
        value={author}
        onChangeText={(text) => setAuthor(text)}
      />
      <Input
        placeholder="Price"
        autoFocus
        type="text"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <Input
        placeholder="Description"
        autoFocus
        type="text"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Input
        placeholder="Image URL"
        autoFocus
        type="text"
        value={imgUrl}
        onChangeText={(text) => setImgUrl(text)}
      />
      <Button
        containerStyle={styles.button}
        onPress={submitPost}
        title="Post Book"
        raised
      />
    </View>
  );
};
const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{
          uri: "https://img.icons8.com/ios-glyphs/90/000000/back.png",
        }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NEW BOOK</Text>
    <Text></Text>
  </View>
);

export default AddNewItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
