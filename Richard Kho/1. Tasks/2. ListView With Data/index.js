import React, { Component } from 'react';

import {
  ListView,
  Text
} from 'react-native';

class TasksList extends Component {
  constructor (props) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 });

    super (props);

    this.state = {
      dataSource: ds.cloneWithRows([
        'Buy milk',
        'Walk the dog',
        'Do laundry',
        'Write the first chapter of my book'
      ])
    };
  }

  render () {
    return (
      <ListView
        dataSource = { this.state.dataSource }
        renderRow = { (rowData) => <Text>
          { rowData } </Text> }
      />
    );
  }
}

export default TasksList
