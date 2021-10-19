import React from "react";
import ShowChatroomHOC from "../../hocs/chatrooms/show";
import {ShowChatroomContext} from "../../contexts/chatrooms";
import {host} from "../../config";
import {AuthContext} from "../../contexts/auth";
import MessagesForm from "../messages/form";
import Appbar from "../shared/appbar";
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

const Message = (
  {
    item, index
  }
) => {

  const {
    currentUser
  } = React.useContext(AuthContext);

  return(
    <div style={{flex: 1, display: "flex", justifyContent: item.user_id === currentUser.id ? 'flex-end' : 'flex-start'}}>
      <div style={{
        display: "flex",
      }}>
        <div
          style={{
            padding: 10,
            borderRadius: 15,
            marginBottom: 10,
            backgroundColor: '#fff',
            minWidth: 80
          }}
        >
          <p style={{margin: 0}}>{item.body}</p>
          <span style={{
            fontSize: 10,
            color: (item.user_id === currentUser.id) && item.read ? '#319ae4' : '#6c757d',
            textAlign: item.user_id === currentUser.id ? 'right' : 'left',
            display: "block"
          }}>{item.created_at}</span>
      </div>
      </div>
    </div>
  )
}

const ShowChatroom = () => {

  const {
    messages,
    user = { }
  } = React.useContext(ShowChatroomContext);

  const classes = useStyles();

  return(
    <div style={classes.container}>
      <Appbar title={ user.name } />
      <ul style={{
        marginBottom: 70,
        backgroundColor: "#bbb",
        height: "100vh",
        marginTop: 0,
        padding: 10
      }}>
        {
          messages.map((item, i) => <Message item={item} key={i} />)
        }
      </ul>
      <MessagesForm />
    </div>
  );
};

export default ShowChatroomHOC(ShowChatroom);
