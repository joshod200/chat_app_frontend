import React from "react";
import {ShowUserContext} from "../../contexts/users";
import ShowUserHOC from "../../hocs/users/show";
import {Text, Image, TouchableOpacity, View, StyleSheet} from "react-native";
import { Divider, Button } from 'react-native-paper';
import {host} from "../../config";
import Appbar from "../shared/appbar";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 50
  }
});

const ShowUser = () => {

  const {
    handleSignout,
    currentUser: user,
    onClickAttachImage,
    image,
  } = React.useContext(ShowUserContext);

  return(
    <>
      <Appbar title="Profile" />
      <View style={{flex: 1, alignItems: "center"}}>
        <Image
          onPress={onClickAttachImage}
          style={styles.image}
          source={{
            uri: image.path,
          }}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userName}>{user.email}</Text>
        </View>
        <Button onPress={handleSignout}>
          Sign out
        </Button>
      </View>
    </>
  );

};

export default ShowUserHOC(ShowUser);
