import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import messagesApi from "../api/messages";
import useApi from "../hooks/useApi";

function MessagesScreen(props) {
  const [messages, setMessages] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from messages screen
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  const getMessagesApi = useApi(messagesApi.getMessages);

  useEffect(() => {
    getMessagesApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={getMessagesApi.data}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.content}
            image={item.image}
            onPress={() => console.log("Message Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={messages}
      />
    </Screen>
  );
}

export default MessagesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
