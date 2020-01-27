import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import { StyleSheet, StatusBar } from 'react-native';
import Check from './components/Check';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile'


const RouterComponent = () => {
  return (
    <Router>
      <Stack hideNavBar key="root">
        <Stack
          key="auth"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          titleStyle={style.titleStyle}
        >
          
          <Scene
            title="Register"
            key="register"
            component={Register}
            initial
          />  
          <Scene
            title="Check"
            key="check"
            component={Check}
          /> 
        </Stack>
        <Stack
          key="main"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          titleStyle={style.titleStyle}
        >
          <Scene
            title="Home"
            key="home"
            component={Home}
            initial
          />
          <Scene
            title="Profile"
            key="profile"
            component={Profile}
          />
        </Stack>
      </Stack>
    </Router>
  );
};


const style = StyleSheet.create({
  navBarStyle: {
    top: StatusBar.currentHeight
  },
  titleStyle: {
    flexDirection: 'row',
    width: 200
  }
});

export default RouterComponent;
