import React from "react";
import {ShowUserContext} from "../../contexts/users";
import {AuthContext} from "../../contexts/auth";
import _AuthHOC from "../_auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {host} from "../../config";

const ShowUserHOC = (Component) => {

  const ShowUserHOCComponent = (props) => {
    const {
      currentUser
    } = React.useContext(AuthContext);

    const [image, setImage] = React.useState({
      path: `${host}${currentUser.avatar.url}`
    });

    const {
      navigation
    } = props;

    console.log(image);

    const handleSignout = () => {
      AsyncStorage.removeItem("headers")
      .then(() => {
        console.log("signed out: showuserhoc");
        navigation.navigate("Home");
      })
    }

    const onClickAttachImage = () => {
      console.log("attach image onclick: productformhoc");
      ImagePicker.openPicker({
        width: 200,
        height: 200,
        cropping: true
      }).then(image => {
        setImage(image);
      })
      .catch(() => {

      })
    }

    const showUserHOC = {
      currentUser,
      handleSignout,
      onClickAttachImage,
      image
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
