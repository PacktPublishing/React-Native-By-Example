import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import TasksList from './app/components/TasksList';
import EditTask from './app/components/EditTask';

class Tasks extends Component {

  render () {
    const routes = [
      { title: 'Tasks', index: 0 },
      { title: 'Edit Task', index: 1 }
    ];

    return (
      <Navigator
        initialRoute={{ index: 0}}
        renderScene={ (routes, navigator) => this._renderScene(routes, navigator) }/>
    );
  }

  _renderScene (route, navigator) {
    if (route.index === 0) {
      return (
        <TasksList
          title={ route.title }
          navigator={ navigator } />
      )
    }

    if (route.index === 1) {
      return (
        <EditTask
          navigator={ navigator }
          route={ route }
          changeTaskCompletionStatus={ route.passProps.changeTaskCompletionStatus }
          changeTaskDueDate={ route.passProps.changeTaskDueDate }
          changeTaskName={ route.passProps.changeTaskName }
          clearTaskDueDate={ route.passProps.clearTaskDueDate }
          completed={ route.passProps.completed }
          due={ route.passProps.due }
          formattedDate={ route.passProps.formattedDate }
          saveCurrentEditedTask={ route.passProps.saveCurrentEditedTask }
          text={ route.passProps.text }
        />
      )
    }
  }
}

AppRegistry.registerComponent('Tasks', () => Tasks);
