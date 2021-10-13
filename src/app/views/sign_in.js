import React from "react";
import SignInHOC from "../hocs/sign_in";
import {
  TextField,
  Button
} from '@material-ui/core';
import {SignInContext} from "../contexts/sign_in";

const SignIn = () => {

  const {
    sessionsForm,
    handleSignIn
  } = React.useContext(SignInContext);

  const {
    formState,
    onChange
  } = sessionsForm;

  const {
    email,
    password
  } = formState;

  return(
    <div style={{justifyContent: "center", padding: 25, flexDirection: "column", display: "flex"}}>
      <h1 style={{textAlign: "center"}}>Sign In</h1>
      <TextField
        name="email"
        label="Email"
        value={email}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={onChange}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignIn}
      >
        Sign in
      </Button>
    </div>
  );
};

export default SignInHOC(SignIn);
