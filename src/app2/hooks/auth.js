import React from "react";
import {host} from "../config";

export default () => {
  const [validateTokenResponse, setValidateTokenResponse] = React.useState();

  const validateToken = ({client, accessToken, uid, expiry}) => {
    console.log("validate token : auth hook");
    fetch(`${host}/auth/validate_token.json`, {
      headers: {
        'client': client,
        'access-token': accessToken,
        'expiry': expiry,
        'uid': uid
      }
    })
    .then((res) => {
      if(res.status === 200){
        res.json()
        .then((body) => {
          console.log("validate token success : auth hook");
          setValidateTokenResponse({success: true, body: body.data})
        })
      }else {
        console.log("validate token error : auth hook");
        setValidateTokenResponse({success: false})
      }
    })
  }

  return {
    validateToken,
    validateTokenResponse
  }
}
