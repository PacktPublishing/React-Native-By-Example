import React, { Component } from 'react';

import {
  NavigatorIOS,
  StyleSheet
} from 'react-native';

import TasksListContainer from '../containers/TasksListContainer';

export default class App extends Component {
  render () {
    return (
      <NavigatorIOS
        initialRoute={{
          component: TasksListContainer,
          title: 'Tasks'
        }}
        style={ styles.container }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
