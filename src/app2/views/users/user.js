import React from "react";
import {UserContext} from "../../contexts/users";
import UserHOC from "../../hocs/users/user";
import {Text, Image, TouchableOpacity, View, StyleSheet} from "react-native";
import { Divider } from 'react-native-paper';
import {host} from "../../config";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  userDetails: {
    marginLeft: 15
  },
  userName: {

  }
});

const User = () => {

  const {
    handleUserClick,
    user,
  } = React.useContext(UserContext);

  return(
    <>
      <TouchableOpacity style={styles.container} onPress={handleUserClick}>
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
      </TouchableOpacity>
      <Divider />
    </>
  );

};

export default UserHOC(User);
