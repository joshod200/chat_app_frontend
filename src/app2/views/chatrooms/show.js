import React from "react";
import ShowChatroomHOC from "../../hocs/chatrooms/show";
import {ShowChatroomContext} from "../../contexts/chatrooms";
import {host} from "../../config";
import {
  IconButton,
  TextField
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {AuthContext} from "../../contexts/auth";
import AppBar from "../shared/appbar";

const ShowChatroom = () => {

  const {
    messages,
    message,
    setMessage,
    handleCreateMessage,
    user = {},
    handleSetMessage
  } = React.useContext(ShowChatroomContext);

  const {
    currentUser
  } = React.useContext(AuthContext);

  return(
    <div>
      <AppBar title={user.name} />
      <div
        style={{
          marginBottom: 70,
          backgroundColor: "#bbb"
        }}
        >
        <ul>
          {
            messages.map((m) => (
              <div style={{flex: 1, display: "flex", justifyContent: m.user_id === currentUser.id ? 'flex-end' : 'flex-start'}}>
                <div style={{
                  display: "flex",
                }}>
                  <div
                    style={{
                      padding: 10,
                      borderRadius: 15,
                      marginBottom: 10,
                      backgroundColor: m.user_id === currentUser.id ? 'blue' : '#fff',
                    }}
                  >
                    <p style={{color: m.user_id === currentUser.id ? '#fff' : ''}}>{m.body}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </ul>
        </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        margin: 16
      }}>
        <TextField
          style={{flex: 1}}
          value={message}
          onChange={handleSetMessage}
          placeholder="Type your message here ..."
        />
        <div>
          <IconButton
            onClick={handleCreateMessage}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ShowChatroomHOC(ShowChatroom);
