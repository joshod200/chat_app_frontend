import React from "react";
import useHomeHook from "../hooks/home";
import {HomeContext} from "../contexts/home";
import _AuthHOC from "./_auth";
import ActionCable from 'actioncable';
import {host} from "../config";
import {
  getCookie
} from '../lib/redirect';

const HomeHOC = (Component) => {

  const HomeHOCCompnent = ({ history }) => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const [cable, setCable] = React.useState();
    const [channel, setChannel] = React.useState();

    const handleNewChatroom = () => {
      console.log("navigate");
      history.push("/chatrooms/new");
    };

    const handleReceived = (message) => {
      console.log("received");
      setChatrooms(message);
    };

    const handleShowUser = () => history.push("/user");

    const handleClickChatroom = (id, user) => history.psuh(`/chatrooms/${id}`, {user});

    const {
      fetchChatrooms,
      fetchChatroomsResponse
    } = useHomeHook();

    const homeContext = {
      chatrooms,
      handleNewChatroom,
      handleClickChatroom,
      handleShowUser
    };

    React.useEffect(() => {
      if(cable) return;
      console.log("fetching headers : authhoc");
      const headers = getCookie("headers");
      const {
        accessToken,
        client,
        uid
      } = JSON.parse(headers);
      const c = ActionCable.createConsumer(`${host}/cable?access-token=${accessToken}&client=${client}&uid=${uid}`);
      const ch = c.subscriptions.create("HomeChannel", {
        connected: () => console.log("connected"),
        received: (message) => {

        }
      });
      setCable(c);
      setChannel(ch);
      return () => c.disconnect();
    }, []);

    React.useEffect(() => {
      fetchChatrooms()
    }, []);

    React.useEffect(() => {
      if(!fetchChatroomsResponse) return;
      if(fetchChatroomsResponse.success) setChatrooms(fetchChatroomsResponse.body);
    }, [fetchChatroomsResponse]);

    return(
      <HomeContext.Provider value={homeContext}>
        <Component />
      </HomeContext.Provider>
    );

  }

  return _AuthHOC(HomeHOCCompnent);

}

export default HomeHOC;
