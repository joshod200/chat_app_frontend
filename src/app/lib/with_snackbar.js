import React from "react";
import {Snackbar} from "react-native-paper";

export const SnackbarContext = React.createContext();

export default (Component) => (props) => {
  const [state, setState] = React.useState({
    message: "",
    backgroundColor: "red"
  });

  const {
    message,
    backgroundColor
  } = state;

  const onDisplaySuccessMessage = (message) => {
    setState({
      message,
      backgroundColor: "green"
    });
  };

  const onDisplayErrorMessage = (message) => {
    setState({
      message,
      backgroundColor: "red"
    });
  };

  const onDismissSnackBar = () => {
    setState({
      message: ""
    });
  };

  const snackbarContext = {
    onDisplaySuccessMessage,
    onDisplayErrorMessage
  };

  return (
    <SnackbarContext.Provider value={snackbarContext}>
      <Snackbar
        visible={Boolean(message)}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor
        }}
      >
        {message}
      </Snackbar>
      <Component {...props} />
    </SnackbarContext.Provider>
  );

};
