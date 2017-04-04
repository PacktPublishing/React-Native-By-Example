import React, { Component } from 'react';
import {
  Navigator,
} from 'react-native';

import TasksListContainer from './TasksListContainer';
import EditTaskContainer from './EditTaskContainer';

export default class Tasks extends Component {

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
        <TasksListContainer
          title={ route.title }
          navigator={ navigator }
        />
      )
    }

    if (route.index === 1) {
      return (
        <EditTaskContainer
          title={ route.title }
          navigator={ navigator }
        />
      )
    }
  }
}
