import React, { Component } from 'react';

import {
  ListView,
  Text,
  TextInput,
  View
} from 'react-native';

class TasksList extends Component {
  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      text: '',
      listOfTasks: []
    };
  }

  _addTask () {
    const listOfTasks = this.state.listOfTasks.slice();

    listOfTasks.push(this.state.text);

    this.setState({
      text: '',
      listOfTasks: listOfTasks
    });

  }

  render () {
    const dataSource = this.state.ds.cloneWithRows
      (this.state.listOfTasks);

    return (
      <View>
        <TextInput
          style = {{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value = { this.state.text }
          autoCorrect = { false }
          onChangeText = { (text) => this.setState({ text }) }
          onSubmitEditing = { () => this._addTask() }
          returnKeyType = { 'done' }
        />
        <ListView
          dataSource = { dataSource }
          renderRow = { (rowData) =>
            <Text> { rowData } </Text> }
          enableEmptySections = { true }
        />
      </View>
    );
  }
}

export default TasksList
