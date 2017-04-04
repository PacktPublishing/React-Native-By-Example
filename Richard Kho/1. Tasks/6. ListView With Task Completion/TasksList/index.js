import React, { Component } from 'react';

import {
  AsyncStorage,
  ListView,
  Text,
  TextInput,
  ScrollView,
  View
} from 'react-native';

import TasksListCell from '../TasksListCell';

class TasksList extends Component {
  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listOfTasks: [],
      text: ''
    };
  }

  componentWillMount () {
    this._updateList();
  }

  _addTask () {
    const listOfTasks = this.state.listOfTasks.slice();
    const singleTask = {
      completed: false,
      text: this.state.text
    }

    listOfTasks.push(singleTask);

    AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks), () => this._updateList());

  }

  _completeTask (rowID) {
    AsyncStorage.getItem('listOfTasks', (error, result) => {
      const parsedResult = JSON.parse(result);
      const listOfTasks = parsedResult.slice();

      listOfTasks[rowID].completed = !listOfTasks[rowID].completed;

      AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks), () => this._updateList());
    })
  }

  _updateList () {
    AsyncStorage.getItem('listOfTasks', (error, result) => {
      const parsedResult = JSON.parse(result);

      const listOfTasks = parsedResult || [];

      this.setState({
        text: '',
        listOfTasks: listOfTasks
      });
    })
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks);

    return (
      <View style={{ flex: 1 }} >
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
          renderRow = { (rowData, sectionID, rowID) =>
            <TasksListCell
              completed = { rowData.completed }
              id = { rowID }
              onPress = { (rowID) => this._completeTask(rowID) }
              text = { rowData.text }
            />
          }
          enableEmptySections = { true }
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

export default TasksList
