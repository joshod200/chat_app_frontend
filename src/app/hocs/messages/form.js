import React from "react";
import {MessagesFormContext} from "../../contexts/messages";
import {ShowChatroomContext} from "../../contexts/chatrooms";
import useMessagesHook from "../../hooks/messages";
import { useParams } from 'react-router-dom';

const MessagesFormHOC = (Component) => {
  const MessagesFormComponent = (props) => {
    const params = useParams();
    const [message, setMessage] = React.useState();

    const {
      chatroom
    } = React.useContext(ShowChatroomContext);

    const {
      createMessage
    } = useMessagesHook();

    const handleSetMessage = ({ target }) => {
      setMessage(target.value);
    }

    const handleCreateMessage = () => {
      if(!message) return;
      createMessage(message, params.id);
      setMessage("");
    }

    const messageFormContext = {
      message,
      handleCreateMessage,
      handleSetMessage
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
