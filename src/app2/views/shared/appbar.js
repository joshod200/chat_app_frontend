import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const MyAppBar = ({title}) => {

  const history = useHistory();

  return(
    <AppBar>
      <Toolbar>
        <IconButton color="inherit" onClick={history.goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar;
