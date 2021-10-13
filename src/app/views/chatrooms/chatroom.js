import React from "react";
import {
  ChatroomContext
} from "../../contexts/chatrooms";
import ChatroomHOC from "../../hocs/chatrooms/chatroom";
import {host} from "../../config";
import {AuthContext} from "../../contexts/auth";
import {
  ListItem,
  Avatar,
  ListItemText,
  Typography
} from "@material-ui/core";

const Chatroom = (props) => {

  const {
    chatroom,
    handleClickChatroom
  } = React.useContext(ChatroomContext);

  const {
    currentUser
  } = React.useContext(AuthContext);

  return(
    <>
      <ListItem button onClick={handleClickChatroom} alignItems="flex-start">
        <Avatar src={`${host}${chatroom.user.avatar.url}`} />
        <ListItemText style={{marginLeft: "20px"}}
          primary={chatroom.user.name}
          secondary={`${chatroom.message_id == currentUser.id ? 'You:' : ''} ${chatroom.message}`}
        />
        <div>
          <Typography variant="caption">{chatroom.last_text}</Typography>
        </div>
      </ListItem>
    </>
  )
};

export default ChatroomHOC(Chatroom);
