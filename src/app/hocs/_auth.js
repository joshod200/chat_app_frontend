import React from "react";
import useAuthHook from "../hooks/auth";
import {AuthContext} from "../contexts/auth";
import {getCookie, setCookie} from '../lib/redirect';

const AuthHOC = (Component) => {

  const AuthHOCCompnent = (props) => {

    const {
      history
    } = props;

    const [currentUser, setCurrentUser] = React.useState();

    const {
      validateToken,
      validateTokenResponse
    } = useAuthHook();

    // check if auth headers are found
    React.useEffect(() => {
      console.log("fetching headers : authhoc");
      const headersCookies = getCookie("headers");
      if(!headersCookies) return history.push(`/sign_in`);
      validateToken(JSON.parse(headersCookies));
    }, []);

    React.useEffect(() => {
      if(!validateTokenResponse) return;
      if(validateTokenResponse.success) setCurrentUser(validateTokenResponse.body)
      else history.push(`/sign_in`);
    }, [validateTokenResponse]);

    const authContext = {
      currentUser
    };

    if(!currentUser) return <div>Loading</div>;

    return(
      <AuthContext.Provider value={authContext}>
        <Component {...props} />
      </AuthContext.Provider>
    );

  }

  return AuthHOCCompnent;

}

export default AuthHOC;
