import React from "react";
import HomeHOC from "../hocs/home";
import {HomeContext} from "../contexts/home";
import {host} from "../config";
import {AuthContext} from "../contexts/auth";
import {
  Fab,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Appbar,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Link} from "react-router-dom";

const Home = () => {

  const {
    handleNewChatroom,
    chatrooms,
    handleClickChatroom,
    handleShowUser
  } = React.useContext(HomeContext);

  const {
    currentUser
  } = React.useContext(AuthContext);

  return(
    <div>
      <Appbar>
        <Toolbar>
          <Typography>
            Chats
          </Typography>
        </Toolbar>
      </Appbar>
      <div>
        <List>
          {
            chatrooms.map((chatroom, i) => (
              <ListItem key={i} component={Link} button to={`/chatrooms/${chatroom.id}`}>
                <Avatar src={`${host}${chatroom.user.avatar.url}`} />
                <ListItemText
                  primary={chatroom.user.name}
                  secondary={chatroom.message}
                />
              </ListItem>
            ))
          }
        </List>
      </div>
      <Fab color="primary" component={Link} to="/chatrooms/new">
         <AddIcon />
       </Fab>
    </div>
  );
};

export default HomeHOC(Home);
