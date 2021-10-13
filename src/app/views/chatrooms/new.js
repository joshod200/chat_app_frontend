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
import {Appbar} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const NewChatroom = () => {

  const {
    users,
    isFetchingUsers
  } = React.useContext(NewChatroomContext);

  const navigation = useNavigation();

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
                  ListHeaderComponent={
                    <Appbar>
                      <Appbar.BackAction onPress={navigation.goBack} />
                      <Appbar.Content title="New Chat" />
                    </Appbar>
                  }
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
