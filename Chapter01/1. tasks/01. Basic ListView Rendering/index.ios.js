import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

import TasksList from './app/components/TasksList';

export default class Tasks extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TasksList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Tasks', () => Tasks);
