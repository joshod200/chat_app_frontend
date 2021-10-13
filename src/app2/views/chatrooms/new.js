import React from "react";
import {
  Text,
  ScrollView,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from "react-native";
import NewChatroomHOC from "../../hocs/chatrooms/new";
import {NewChatroomContext} from "../../contexts/chatrooms";
import User from "../users/user";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  salutation: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

const NewChatroom = () => {

  const {
    users,
    isFetchingUsers
  } = React.useContext(NewChatroomContext);

  return(
    <View style={styles.container}>
      <View>
        {
          isFetchingUsers?
          <ActivityIndicator size="large" color="#00ff00" />
          : (
            <>
              <View>
                <FlatList
                  data={users}
                  renderItem={({item, index}) => <User user={item} />}
                />
              </View>
            </>
          )
        }
      </View>
    </View>
  );
};

export default NewChatroomHOC(NewChatroom);
