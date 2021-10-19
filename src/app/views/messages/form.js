import React from "react";
import MessagesFormHOC from "../../hocs/messages/form";
import {
  IconButton,
  TextField
} from "@material-ui/core";
import {MessagesFormContext} from "../../contexts/messages";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  messageInputContainer: {
    display: "flex",
    justifyContent: "space-between",
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    margin: 16
  },
  messageInput: {
    flex: 1
  }
}));

const MessagesForm = () => {

  const classes = useStyles();

  const {
    message,
    handleSetMessage,
    handleCreateMessage
  } = React.useContext(MessagesFormContext);

  return (
    <div className={classes.messageInputContainer}>
      <TextField
        value={message}
        onChange={handleSetMessage}
        placeholder="Type your message here ..."
        className={classes.messageInput}
      />
      <div>
        <IconButton
          onClick={handleCreateMessage}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MessagesFormHOC(MessagesForm);
