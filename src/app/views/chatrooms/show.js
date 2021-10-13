import React from "react";
import {
  Text,
  ScrollView,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  Image
} from "react-native";
import ShowChatroomHOC from "../../hocs/chatrooms/show";
import {ShowChatroomContext} from "../../contexts/chatrooms";
import {IconButton} from "react-native-paper";
import {host} from "../../config";
import {AuthContext} from "../../contexts/auth";
import MessagesForm from "../messages/form";
import Appbar from "../shared/appbar";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const ShowChatroom = () => {

  const {
    messages,
    user
  } = React.useContext(ShowChatroomContext);

  const {
    currentUser
  } = React.useContext(AuthContext);

  return(
    <View style={styles.container}>
      <FlatList
        style={{
          marginBottom: 70,
          backgroundColor: "#dddd",
        }}
        ListHeaderComponent={
          <Appbar title={user.name} />
        }
        data={messages}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <View style={{flex: 1}}>
            <View style={{
              alignItems: item.user_id === currentUser.id ? 'flex-end' : 'flex-start',
            }}>
              <View
                style={{
                  padding: 10,
                  borderRadius: 15,
                  marginBottom: 10,
                  marginRight: item.user_id === currentUser.id ? 11 : 0,
                  marginLeft: item.user_id === currentUser.id ? 0 : 11,
                  backgroundColor: '#fff',
                }}
              >
                <Text>{item.body}</Text>
                <Text style={{
                  fontSize: 10,
                  color: item.user_id === currentUser.id && item.read ? 'blue' : '#6c757d',
                  textAlign: item.user_id === currentUser.id ? 'right' : 'left',
                }}>{item.created_at}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <MessagesForm />
    </View>
  );
};

export default ShowChatroomHOC(ShowChatroom);
