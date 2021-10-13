import React from "react";
import {ChatroomContext} from "../../contexts/chatrooms";
import { useHistory } from 'react-router-dom';

const ChatroomHOC = (Component) => {
    const ChatroomComponent = (props) => {

      const history = useHistory();

      const {
        chatroom
      } = props;

      const handleClickChatroom = (id, user) => history.push(`/chatrooms/${chatroom.id}`, {user: chatroom.user});

      const chatroomContext = {
        chatroom,
        handleClickChatroom
      }

      return(
        <ChatroomContext.Provider value={chatroomContext}>
          <Component {...props} />
        </ChatroomContext.Provider>
      );
    }

    return ChatroomComponent;
}

export default ChatroomHOC;
