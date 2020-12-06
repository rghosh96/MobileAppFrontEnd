import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as Font from 'expo-font';
import themeReducer from './redux/themeReducer';
import {Navigation, FirstNav, ReturningUser} from './Navigation'
import AsyncStorage from '@react-native-community/async-storage'

const store = createStore(combineReducers({themeReducer}), applyMiddleware(thunk))



export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [fontsLoaded, setFontsLoaded] = React.useState(false)

  useEffect(() => {
    Font.loadAsync({
        header: require('./assets/fonts/ArchivoBlack-Regular.ttf'),
        text: require('./assets/fonts/Spartan-Medium.ttf')
    }).then(() => {
      setFontsLoaded(true)
    })
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        AsyncStorage.setItem('alreadyLaunched', 'false');
        setIsFirstLaunch(false);
      }
    })
    AsyncStorage.getItem('user').then(value => {
      if (value == null) {
        AsyncStorage.setItem('user', value);
        setUser(true);
      } else {
        setUser(false);
      }
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        AsyncStorage.setItem('alreadyLaunched', 'false');
        setIsFirstLaunch(false);
      }
    })
    AsyncStorage.getItem('user').then(value => {
      if (value == null) {
        AsyncStorage.setItem('user', value);
        setUser(true);
      } else {
        setUser(false);
      }
    })
  }, []);

 console.log(user)

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true && user===false && fontsLoaded) {
    return ( <Provider store={ store }>
      <FirstNav />
    </Provider>) 
  } else if (isFirstLaunch === false && user ===false && fontsLoaded) {
    return ( <Provider store={ store }>
      <ReturningUser />
    </Provider>) 
  } else if (user === true && fontsLoaded) {
    return (
      <Provider store={ store }>
        <Navigation />
      </Provider>
      
    );
  } else { return null}
}



