import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatItem from "../components/ChatItem";
import { db } from "../firebase";

const ChatScreen = ({ navigation }) => {
  const [chats, setchats] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setchats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);

  const enterChat = (id, chatName, chatImageUrl) => {
    navigation.navigate("Message", {
      id,
      chatName,
      chatImageUrl,
    });
  };
  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <ScrollView style={styles.list}>
        {chats?.map(({ id, data: { chatName, chatImageUrl } }) => (
          <ChatItem
            key={id}
            id={id}
            chatName={chatName}
            chatImageUrl={chatImageUrl}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const Header = ({ navigation }) => (
  <View style={[styles.headerContainer, styles.lol]}>
    <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
      <Image
        source={{
          uri: "https://img.icons8.com/ios-glyphs/90/000000/back.png",
        }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>CHAT</Text>
    <Text></Text>
  </View>
);

export default ChatScreen;

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    height: "100%",
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
