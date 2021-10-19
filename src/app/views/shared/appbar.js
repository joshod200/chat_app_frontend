import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton
} from "@material-ui/core";
import {
  useHistory
} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const MyAppbar = (
  {
    title
  }
) => {

  const history = useHistory();

  return(
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={history.goBack} color="inherit">
          <ArrowBackIcon />
        </IconButton>
        { title }
      </Toolbar>
    </AppBar>
  )
}

export default MyAppbar;
