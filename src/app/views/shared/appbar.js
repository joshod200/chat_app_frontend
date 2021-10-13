import React from "react";
import {
  Appbar
} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";


const MyAppbar = ({title}) => {
  
  const navigation = useNavigation();

  return(
    <Appbar>
      <Appbar.BackAction onPress={navigation.goBack} />
      <Appbar.Content title={title} />
    </Appbar>
  )
}

export default MyAppbar;
