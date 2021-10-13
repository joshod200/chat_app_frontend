import React from "react";
import useMessagesHook from "../../hooks/messages";
import {ShowChatroomContext} from "../../contexts/chatrooms";
import _AuthHOC from "../_auth";
import {AuthContext} from "../../contexts/auth";
import ActionCable from 'react-native-actioncable';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import {host} from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowChatroomHOC = (Component) => {

  const ShowChatroomHOCCompnent = ({ route }) => {
    const [messages, setMessages] = React.useState([]);
    const [cable, setCable] = React.useState();
    const [channel, setChannel] = React.useState();
    const messagesRef = React.useRef();

    const {
      fetchMessages,
      fetchMessagesResponse,
      readMessages
    } = useMessagesHook();

    const {
      currentUser
    } = React.useContext(AuthContext);

    React.useEffect(() => {
      if(messages.length == 0) return;
      const unreadMessages = messages.filter((message) => {
        return message.read == false && message.user_id != currentUser.id;
      });
      const unreadMessagesIds = unreadMessages.map((unreadMessage) => unreadMessage.id);
      readMessages(unreadMessagesIds)
    }, [messages]);

    React.useEffect(() => {
      messagesRef.current = messages
    }, [messages])

    const { id, user } = route.params;

    React.useEffect(() => {
      if(cable) return;
      console.log("fetching headers : authhoc");
      AsyncStorage.getItem('headers')
      .then((headers) => {
        console.log("headers found : authhoc. validate");
        const {
          accessToken,
          client,
          uid
        } = JSON.parse(headers);
        const c = ActionCable.createConsumer(`${host}/cable?access-token=${accessToken}&client=${client}&uid=${uid}`);
        const ch = c.subscriptions.create({channel: "ChatRoomChannel", chat_room_id: id}, {
          connected: () => console.log("connected"),
          received: (message) => {
            message = JSON.parse(message);
            messagesRef.current.push(message);
            setMessages(messagesRef.current);
          }
        });
        setCable(c);
        setChannel(ch);
      })
      return () => c.disconnet();
    }, []);

    React.useEffect(() => {
      fetchMessages(id);
    }, []);

    React.useEffect(() => {
      if(!fetchMessagesResponse) return;
      if(fetchMessagesResponse.success) setMessages(fetchMessagesResponse.body);
    }, [fetchMessagesResponse]);

    const showChatroomContext = {
      messages,
      user
    };

    return(
      <ShowChatroomContext.Provider value={showChatroomContext}>
        <Component />
      </ShowChatroomContext.Provider>
    );

  }

  return _AuthHOC(ShowChatroomHOCCompnent);

}

export default ShowChatroomHOC;
