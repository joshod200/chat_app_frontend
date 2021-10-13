import React from "react";
import useMessagesHook from "../../hooks/messages";
import {ShowChatroomContext} from "../../contexts/chatrooms";
import _AuthHOC from "../_auth";
import ActionCable from 'actioncable';
import {host} from "../../config";
import {getCookie} from '../../lib/redirect';

const ShowChatroomHOC = (Component) => {

  const ShowChatroomHOCCompnent = ({ match }) => {
    const [messages, setMessages] = React.useState([]);
    const [cable, setCable] = React.useState();
    const [channel, setChannel] = React.useState();
    const messagesRef = React.useRef();

    React.useEffect(() => {
      messagesRef.current = messages
    }, [messages])

    const { id, user } = match.params;

    React.useEffect(() => {
      if(cable) return;
      console.log("fetching headers : authhoc");
      console.log("headers found : authhoc. validate");
      const {
        accessToken,
        client,
        uid
      } = JSON.parse(getCookie("headers"));
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
    }, []);


    const [message, setMessage] = React.useState("");

    const {
      fetchMessages,
      fetchMessagesResponse,
      createMessage
    } = useMessagesHook();

    React.useEffect(() => {
      fetchMessages(id);
    }, []);

    React.useEffect(() => {
      if(!fetchMessagesResponse) return;
      if(fetchMessagesResponse.success) setMessages(fetchMessagesResponse.body);
    }, [fetchMessagesResponse]);

    const handleCreateMessage = () => {
      createMessage(message, id);
      setMessage("");
    }

    const handleSetMessage = ({target}) => setMessage(target.value);

    const showChatroomContext = {
      messages,
      message,
      setMessage,
      handleCreateMessage,
      user,
      handleSetMessage
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
