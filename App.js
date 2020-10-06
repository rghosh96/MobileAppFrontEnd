import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './redux/themeReducer';
import {Navigation, FirstNav} from './Navigation'
import AsyncStorage from '@react-native-community/async-storage'

const store = createStore(combineReducers({themeReducer}), applyMiddleware(thunk))



export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return ( <Provider store={ store }>
      <FirstNav />
    </Provider>) 
  } else {
    return (
      <Provider store={ store }>
        <Navigation />
      </Provider>
      
    );
  }
  
}



