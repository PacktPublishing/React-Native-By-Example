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
      currentEditedTaskObject: undefined,
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
      due: undefined,
      formattedDate: undefined,
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

  _completeTask (rowID) {
    const singleUpdatedTask = {
      ...this.state.listOfTasks[rowID],
      completed: !this.state.listOfTasks[rowID].completed
    };

    this._saveAndUpdateSelectedTask(singleUpdatedTask, rowID);
  }

  _editTask (rowData, rowID) {
    this.setState({
      currentEditedTaskObject: rowData
    });

    this.props.navigator.push({
      component: EditTask,
      onRightButtonPress: () => this._saveCurrentEditedTask(rowID),
      passProps: {
        changeTaskCompletionStatus: (status) => this._updateCurrentEditedTaskObject('completed', status),
        changeTaskDueDate: (date, formattedDate) => this._updateCurrentEditedTaskDueDate(date, formattedDate),
        changeTaskName: (name) => this._updateCurrentEditedTaskObject('text', name),
        clearTaskDueDate: () => this._updateCurrentEditedTaskDueDate(undefined, undefined),
        completed: this.state.currentEditedTaskObject.completed,
        due: this.state.currentEditedTaskObject.due,
        formattedDate: this.state.currentEditedTaskObject.formattedDate,
        text: this.state.currentEditedTaskObject.text
      },
      rightButtonTitle: 'Save',
      title: 'Edit'
    });
  }

  _renderRowData (rowData, rowID) {
    return (
      <TasksListCell
        completed={ rowData.completed }
        id={ rowID }
        onLongPress={ () => this._editTask(rowData, rowID) }
        onPress={ () => this._completeTask(rowID) }
        text={ rowData.text }
      />
    )
  }

  async _saveAndUpdateSelectedTask (newTaskObject, rowID) {
    const listOfTasks = this.state.listOfTasks.slice();
    listOfTasks[rowID] = newTaskObject;

    await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

    this._updateList();
  }

  _saveCurrentEditedTask (rowID) {
    this._saveAndUpdateSelectedTask(this.state.currentEditedTaskObject, rowID);
    this.props.navigator.pop();
  }

  _updateCurrentEditedTaskDueDate (date, formattedDate) {
    this._updateCurrentEditedTaskObject('due', date);
    this._updateCurrentEditedTaskObject('formattedDate', formattedDate);
  }

  _updateCurrentEditedTaskObject (key, value) {
    let newTaskObject = Object.assign({}, this.state.currentEditedTaskObject);

    newTaskObject[key] = value;

    this.setState({
      currentEditedTaskObject: newTaskObject
    });
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