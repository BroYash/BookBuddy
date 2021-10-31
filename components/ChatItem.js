import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const ChatItem = ({ id, chatName, chatImageUrl, enterChat }) => {
  const [chatMessages, setChatMessags] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessags(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  }, []);

  return (
    <ListItem
      style={styles.container}
      key={id}
      bottomDivider
      onPress={() => enterChat(id, chatName)}
    >
      <Avatar
        rounded
        source={{
          uri: chatImageUrl,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {!chatMessages[0]
            ? "Start chatting"
            : chatMessages?.[0]?.displayName +
              ": " +
              chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatItem;

const styles = StyleSheet.create({});
