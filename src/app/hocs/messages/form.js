import React from "react";
import {MessagesFormContext} from "../../contexts/messages";
import {ShowChatroomContext} from "../../contexts/chatrooms";
import useMessagesHook from "../../hooks/messages";
import { useRoute } from '@react-navigation/native';

const MessagesFormHOC = (Component) => {
  const MessagesFormComponent = (props) => {

    const route = useRoute();

    const [message, setMessage] = React.useState();

    const {
      chatroom
    } = React.useContext(ShowChatroomContext);

    const {
      createMessage
    } = useMessagesHook();

    const handleCreateMessage = () => {
      if(!message) return;
      createMessage(message, route.params.id);
      setMessage("");
    }

    const messageFormContext = {
      message,
      setMessage,
      handleCreateMessage
    };

    return(
      <MessagesFormContext.Provider value={messageFormContext}>
        <Component {...props} />
      </MessagesFormContext.Provider>
    )
  }

  return MessagesFormComponent;
};

export default MessagesFormHOC;
