import React from "react";
import {ShowUserContext} from "../../contexts/users";
import {AuthContext} from "../../contexts/auth";
import _AuthHOC from "../_auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowUserHOC = (Component) => {

  const ShowUserHOCComponent = (props) => {

    const {
      navigation
    } = props;

    const {
      currentUser
    } = React.useContext(AuthContext);

    const handleSignout = () => {
      AsyncStorage.removeItem("headers")
      .then(() => {
        console.log("signed out: showuserhoc");
        navigation.navigate("Home");
      })
    }

    const showUserHOC = {
      currentUser,
      handleSignout
    };

    return(
      <ShowUserContext.Provider value={showUserHOC}>
        <Component {...props} />
      </ShowUserContext.Provider>
    );

  };

  return _AuthHOC(ShowUserHOCComponent);

};

export default ShowUserHOC;
