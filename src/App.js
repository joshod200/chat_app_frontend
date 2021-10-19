import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignIn from "./app/views/sign_in";
import Home from "./app/views/home";
//import NewChatroom from "./app/views/chatrooms/new";
import ShowChatroom from "./app/views/chatrooms/show";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#319ae4",
    },
  },
});

const stackBuilder = (Component, paths) =>  ({ Component, paths });
const stacks = [
  stackBuilder(SignIn, ["/sign_in"]),
  stackBuilder(Home, ["/"]),
//  stackBuilder(ShowChatroom, ["/chatrooms/new"]),
  stackBuilder(ShowChatroom, ["/chatrooms/:id"])
];

const App = () => {

  return(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          {
            stacks.map(function({ Component, paths }, i){
              return paths.map(function(path, i){
                return(
                  <Route exact { ...{ path } } render={ (props) => <Component { ...props } /> } />
                )
              })
            })
          }
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
