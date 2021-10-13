import React from "react";
import {host} from "../config";
import authFetch from "../lib/auth_fetch";

export default () => {
  const [fetchChatroomsResponse, setFetchChatroomsResponse] = React.useState();

  const fetchChatrooms = () => {
    console.log("fetching chatrooms: chatroomshook");
    authFetch(`${host}/chat_rooms.json`)
    .then((res) => {
      if(res.status === 200) {
        console.log("fetch chatrooms success: chatroomshook");
        res.json()
        .then((body) => setFetchChatroomsResponse({success: true, body}))
      }
      else {
        console.log("fetch chatrooms error: chatroomshook");
        setFetchChatroomsResponse({success: false})
      }
    })
  }

  return {
    fetchChatroomsResponse,
    fetchChatrooms
  };
}
