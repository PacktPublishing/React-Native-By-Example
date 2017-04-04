import React, { Component } from 'react';

import {
  AsyncStorage,
  ListView,
  Text,
  TextInput,
  View
} from 'react-native';

import EditTask from '../EditTask';
import TasksListCell from '../TasksListCell';
import styles from './styles';

export default class TasksList extends Component {
  constructor (props) {
    super (props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listOfTasks: [],
      text: ''
    };
  }

  componentDidMount () {
    this._updateList();
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks);

    return (
      <View style={ styles.container }>
        <TextInput
          autoCorrect={ false }
          onChangeText={ (text) => this._changeTextInputValue(text) }
          onSubmitEditing={ () => this._addTask() }
          returnKeyType={ 'done' }
          style={ styles.textInput }
          value={ this.state.text }
        />
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={ (rowData, sectionID, rowID) => this._renderRowData(rowData, rowID) }
          style={ styles.listView }
        />
      </View>
    );
  }

  async _addTask () {
    const singleTask = {
      completed: false,
      text: this.state.text
    }

    const listOfTasks = [...this.state.listOfTasks, singleTask];

    await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

    this._updateList();
  }

  _changeTextInputValue (text) {
    this.setState({
      text
    });
  }

  async _completeTask (rowID) {
    const singleUpdatedTask = {
      ...this.state.listOfTasks[rowID],
      completed: !this.state.listOfTasks[rowID].completed
    };

    const listOfTasks = this.state.listOfTasks.slice();
    listOfTasks[rowID] = singleUpdatedTask;

    await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

    this._updateList();
  }

  _editTask (rowData) {
    // this function executes when TasksListCell receives an
    // onLongPress event
    this.props.navigator.push({
      component: EditTask,
      title: 'Edit'
    });
  }

  _renderRowData (rowData, rowID) {
    return (
      <TasksListCell
        completed={ rowData.completed }
        id={ rowID }
        onLongPress={ () => this._editTask() }
        onPress={ () => this._completeTask(rowID) }
        text={ rowData.text }
      />
    )
  }

  async _updateList () {
    let response = await AsyncStorage.getItem('listOfTasks');
    let listOfTasks = await JSON.parse(response) || [];

    this.setState({
      listOfTasks
    });

    this._changeTextInputValue('');
  }
}