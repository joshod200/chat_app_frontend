import React from "react";
import {UserContext} from "../../contexts/users";
import useChatroomsHook from "../../hooks/chatrooms";
import { useNavigation } from '@react-navigation/native';

const UserHOC = (Component) => {

  const UserHOCComponent = (props) => {

    const {
      user,
    } = props;

    const {
      createChatroom,
      createChatroomResponse
    } = useChatroomsHook();

    const navigation = useNavigation();

    const navigateToChatroom = (id, user) => navigation.navigate("Chatroom", {id, user});

    const handleUserClick = () => {
      console.log(user);
      if(user.chat_room_with_current_user) navigateToChatroom(user.chat_room_with_current_user, user);
      else{
        console.log("no chatroom with current user");
        createChatroom(user.id);
      }
    }


    React.useEffect(() => {
      if(!createChatroomResponse) return;
      if(createChatroomResponse.success) {
        console.log(createChatroomResponse.body);
        navigateToChatroom(createChatroomResponse.body.id, user);
      }else{
        console.log("failed to create chatroom");
      }
    }, [createChatroomResponse]);

    const userHOC = {
      user,
      handleUserClick
    };

    return(
      <UserContext.Provider value={userHOC}>
        <Component {...props} />
      </UserContext.Provider>
    );

  };

  return UserHOCComponent;

};

export default UserHOC;
