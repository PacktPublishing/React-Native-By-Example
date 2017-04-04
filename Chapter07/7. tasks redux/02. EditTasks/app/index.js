import React, { Component } from 'react';
import AppContainer from './containers/AppContainer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import listOfTasks from './reducers';

let store = createStore(listOfTasks, applyMiddleware(thunk));

export default function Tasks (props) {
  return (
    <Provider store={ store }>
      <AppContainer />
    </Provider>
  )
}