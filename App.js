import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './redux/themeReducer';
import {Navigation} from './Navigation'

const store = createStore(combineReducers({themeReducer}), applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={ store }>
      <Navigation />
    </Provider>
    
  );
}



