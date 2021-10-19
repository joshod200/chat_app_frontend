import React from "react";
import useMessagesHook from "../../hooks/messages";
import {ShowChatroomContext} from "../../contexts/chatrooms";
import _AuthHOC from "../_auth";
import {AuthContext} from "../../contexts/auth";
import ActionCable from 'actioncable';
import {host} from "../../config";
import {
  getCookie
} from '../../lib/redirect';

const ShowChatroomHOC = (Component) => {

  const ShowChatroomHOCCompnent = ({ match, location }) => {
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

    const { id } = match.params;

    const { user } = location.state;

    React.useEffect(() => {
      if(cable) return;
      const headers = getCookie("headers");
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
      return () => c.disconnect();
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
