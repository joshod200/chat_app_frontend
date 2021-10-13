import React from "react";
import MessagesFormHOC from "../../hocs/messages/form";
import {
  StyleSheet,
  View,
  TextInput
} from "react-native";
import {IconButton} from "react-native-paper";
import {MessagesFormContext} from "../../contexts/messages";

const styles = StyleSheet.create({
  messageInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    margin: 16
  },
  messageInput: {
    flex: 1
  }
})

const MessagesForm = () => {

  const {
    message,
    setMessage,
    handleCreateMessage
  } = React.useContext(MessagesFormContext);

  return (
    <View style={styles.messageInputContainer}>
      <TextInput
        style={styles.messageInput}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message here ..."
      />
      <View>
        <IconButton
         icon="send"
         size={20}
         onPress={handleCreateMessage}
        />
      </View>
    </View>
  );
};

export default MessagesFormHOC(MessagesForm);
