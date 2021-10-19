import React from "react";
import HomeHOC from "../hocs/home";
import {HomeContext} from "../contexts/home";
import {host} from "../config";
import {AuthContext} from "../contexts/auth";
import {
  Fab,
  List,
  AppBar,
  Typography,
  Toolbar,
  Divider,
  Avatar
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Chatroom from "./chatrooms/chatroom";
import {Center, Paper} from "react-ui";
import {Link} from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

const Home = () => {

  const styles = useStyles();

  const {
    handleNewChatroom,
    isFetchingHome,
    chatrooms,
    handleClickChatroom,
    handleShowUser
  } = React.useContext(HomeContext);

  const {
    currentUser
  } = React.useContext(AuthContext);

  return(
    <>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6">
            Chats
          </Typography>
          <Avatar component={Link} to="/profile" src={host + currentUser.avatar.url} />
        </Toolbar>
      </AppBar>
      <Center>
        <Paper>
          <Typography variant="h5">Chats</Typography>
          <List>
            {
              chatrooms.map((chatroom, i) => (
                <>
                  <Chatroom key={i} chatroom={chatroom} />
                  { chatrooms.length - 1 != i ? <Divider /> : null}
                </>
              ))
            }
          </List>
        </Paper>
      </Center>
      <Fab className={styles.fab} color="primary" component={Link} to="/chatrooms/new">
       <AddIcon />
     </Fab>
    </>
  );
};

export default HomeHOC(Home);
