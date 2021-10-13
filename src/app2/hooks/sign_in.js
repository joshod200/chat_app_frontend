import React from "react";
import {host} from "../config";

export default () => {
  const [signInResponse, setSignInResponse] = React.useState();

  const signIn = (body) => {
    fetch(`${host}/auth/sign_in.json`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json"
      }
    })
    .then((res) => {
      if(res.status === 200) {
        console.log("sign in success : signinhook");
        setSignInResponse({success: true, body: res.headers})
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return {
    signIn,
    signInResponse
  }
}
