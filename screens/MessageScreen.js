import React, { useState, useEffect, useRef } from "react";
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { TextInput } from "react-native-gesture-handler";
import { auth, db } from "../firebase";
import firebase from "firebase";

const MessageScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    console.log(messages);
    scrollViewRef.current.scrollToEnd();

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header navigation={navigation} route={route} />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
              contentContainerStyle={{
                paddingTop: 15,
              }}
            >
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      source={{
                        uri: data.photoUrl,
                      }}
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={35}
                      position="absolute"
                      rounded
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      source={{
                        uri: data.photoUrl,
                      }}
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      bottom={-15}
                      left={-5}
                      size={35}
                      position="absolute"
                      rounded
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity activeOpacity={0.5}>
                <Ionicons name="add" size={30} color="grey" />
              </TouchableOpacity>

              <TextInput
                placeholder="message"
                style={styles.textInput}
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                value={input}
              />
              <TouchableOpacity activeOpacity={0.5}>
                <Ionicons name="camera-outline" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 10 }}>
                <Ionicons name="ios-mic-outline" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};
const Header = ({ navigation, route }) => (
  <View style={[styles.headerContainer, styles.lol]}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{
          uri: "https://img.icons8.com/ios-glyphs/90/000000/back.png",
        }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>{route.params.chatName}</Text>
    <Text></Text>
  </View>
);
export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 10,
    bottom: "0%",
  },
  textInput: {
    height: 40,
    flex: 1,
    marginRight: 12,
    marginLeft: 12,
    backgroundColor: "#ECECEC",
    borderColor: "transparent",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 10,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2868E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
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
  lol: {
    marginHorizontal: 10,
  },
});
