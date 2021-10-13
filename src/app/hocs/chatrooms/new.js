import React from "react";
import useUsersHook from "../../hooks/users";
import {NewChatroomContext} from "../../contexts/chatrooms";
import _AuthHOC from "../_auth";

const NewChatroomHOC = (Component) => {

  const NewChatroomHOCCompnent = ({ navigation }) => {
    const [users, setUsers] = React.useState([]);

    const {
      fetchUsers,
      fetchUsersResponse
    } = useUsersHook();

    React.useEffect(() => {
      fetchUsers();
    }, []);

    React.useEffect(() => {
      if(!fetchUsersResponse) return;
      if(fetchUsersResponse.success) setUsers(fetchUsersResponse.body);
    }, [fetchUsersResponse]);

    const newChatroomContext = {
      users
    };

    return(
      <NewChatroomContext.Provider value={newChatroomContext}>
        <Component />
      </NewChatroomContext.Provider>
    );

  }

  return NewChatroomHOCCompnent;

}

export default NewChatroomHOC;
