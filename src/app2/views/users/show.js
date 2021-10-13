import React from "react";
import {ShowUserContext} from "../../contexts/users";
import ShowUserHOC from "../../hocs/users/show";
import {Text, Image, TouchableOpacity, View, StyleSheet} from "react-native";
import { Divider, Button } from 'react-native-paper';
import {host} from "../../config";

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
  } = React.useContext(ShowUserContext);

  return(
    <View style={{flex: 1, alignItems: "center"}}>
      <Image
        style={styles.image}
        source={{
          uri: `${host}${user.avatar.url}`,
        }}
      />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userName}>{user.about}</Text>
      </View>
      <Button onPress={handleSignout}>
        Sign out
      </Button>
    </View>
  );

};

export default ShowUserHOC(ShowUser);
