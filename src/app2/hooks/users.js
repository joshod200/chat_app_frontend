import React from "react";
import {host} from "../config";
import authFetch from "../lib/auth_fetch";

export default () => {

  const [fetchUsersResponse, setFetchUsersResponse] = React.useState();

  const fetchUsers = () => {
    console.log("fetching users: usershook");
    authFetch(`${host}/users.json`)
    .then((res) => {
      if(res.status === 200) {
        console.log("fetch users success: usershook");
        res.json()
        .then((body) => setFetchUsersResponse({success: true, body}))
      }
      else {
        console.log("fetch users error: usershook");
        setFetchUsersResponse({success: false})
      }
    })
  }

  return {
    fetchUsersResponse,
    fetchUsers
  };
}
