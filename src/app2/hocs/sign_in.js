import React from "react";
import useSignInHook from "../hooks/sign_in";
import {SignInContext} from "../contexts/sign_in";
import useForm from "../lib/form";
import {setCookie} from "../lib/redirect";

const SignInHOC = (Component) => {

  const SignInHOCCompnent = (props) => {
    const {history} = props;
    const sessionsForm = useForm({
      init: {
        email: "",
        password: ""
      }
    });

    const {
      signIn,
      signInResponse
    } = useSignInHook();

    const handleSignIn = () => {
      console.log("handle sign in: signinhoc");
      signIn(sessionsForm.formState);
    }

    React.useEffect(() => {
      if(!signInResponse) return;
      if(signInResponse.success){
        console.log("sign in success: signinhoc. Store headers");
        const headers = signInResponse.body;
        const expiry = headers.get("expiry");
        const uid = headers.get("uid");
        const client = headers.get("client");
        const accessToken = headers.get("access-token");
        const sHeaders = {
          expiry,
          uid,
          client,
          accessToken
        };
        setCookie("headers", JSON.stringify(sHeaders), expiry);
        history.push("/");
      }
    }, [signInResponse]);

    const signInContext = {
      sessionsForm,
      handleSignIn
    };

    return(
      <SignInContext.Provider value={signInContext}>
        <Component />
      </SignInContext.Provider>
    );

  }

  return SignInHOCCompnent;

}

export default SignInHOC;
