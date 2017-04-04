import React, { Component } from 'react';
import AppContainer from './containers/AppContainer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import listOfTasks from './reducers';
import { saveAsyncStorage } from './utils/storageMethods';

let store = createStore(listOfTasks, applyMiddleware(thunk));

store.subscribe(() => {
  saveAsyncStorage(store.getState().listOfTasks);
});

export default function Tasks (props) {
  return (
    <Provider store={ store }>
      <AppContainer />
    </Provider>
  )
}
