import React from "react";
import {host} from "../config";
import authFetch from "../lib/auth_fetch";

export default () => {
  const [fetchMessagesResponse, setFetchMessagesResponse] = React.useState();
  const [createMessageResponse, setCreateMessageResponse] = React.useState();

  const fetchMessages = (id) => {
    console.log("fetching messages: messageshook");
    authFetch(`${host}/chat_rooms/${id}/messages.json`)
    .then((res) => {
      if(res.status === 200) {
        console.log("fetch messages success: messageshook");
        res.json()
        .then((body) => setFetchMessagesResponse({success: true, body}))
      }
      else {
        console.log("fetch messages error: messageshook");
        setFetchMessagesResponse({success: false})
      }
    })
  }

  const readMessages = (ids) => {
    console.log("read message: messageshook");
    authFetch(`${host}/messages/read.json?ids=${ids}`, {
      method: "put"
    })
  }

  const createMessage = (message, id) => {
    console.log("creating message: messageshook");
    authFetch(`${host}/chat_rooms/${id}/messages.json`, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({message: {body: message}})
    })
  }

  return {
    fetchMessagesResponse,
    fetchMessages,
    createMessage,
    createMessageResponse,
    readMessages
  };
}
