import React from "react";
import {host} from "../config";
import authFetch from "../lib/auth_fetch";

export default () => {
  const [fetchChatroomsResponse, setFetchChatroomsResponse] = React.useState();
  const [createChatroomResponse, setCreateChatroomResponse] = React.useState();

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

  const createChatroom = (id) => {
    console.log("creating chatroom: chatroomshook");
    authFetch(`${host}/chat_rooms.json?user_id=${id}`, {
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    })
    .then((res) => {
      if(res.status === 201) {
        console.log("create chatroom success: chatroomshook");
        res.json()
        .then((body) => {
          setCreateChatroomResponse({success: true, body})
        })
      }
      else {
        console.log("create chatroom error: chatroomshook");
        setCreateChatroomResponse({success: false})
      }
    })
  }

  return {
    fetchChatroomsResponse,
    fetchChatrooms,
    createChatroom,
    createChatroomResponse
  };
}
