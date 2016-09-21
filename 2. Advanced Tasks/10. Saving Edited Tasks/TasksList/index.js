import React, { Component } from 'react';

import {
  AsyncStorage,
  ListView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import EditTask from '../EditTask';
import TasksListCell from '../TasksListCell';
import ExpandableCell from '../ExpandableCell';

import styles from './styles';

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


  render () {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfTasks);

    return (
      <View style={ styles.tasksListContainer } >
        <TextInput
          autoCorrect={ false }
          onChangeText={ (text) => this.setState({ text }) }
          onSubmitEditing={ () => this._addTask() }
          returnKeyType={ 'done' }
          style={ styles.tasksListTextInput }
          value={ this.state.text }
        />
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={ (rowData, sectionID, rowID) =>
            <TasksListCell
              completed={ rowData.completed }
              id={ rowID }
              onLongPress={ () => this._onLongPress(rowID) }
              onPress={ (rowID) => this._completeTask(rowID) }
              text={ rowData.text }
              completed={ rowData.completed }
              formattedDate={ rowData.hasOwnProperty('formattedDate') ? rowData.formattedDate : undefined }
            />
          }
          style={ styles.tasksListView }
        />
      </View>
    );
  }

  _addTask () {
    const listOfTasks = this.state.listOfTasks.slice();
    const singleTask = {
      completed: false,
      dueDate: undefined,
      text: this.state.text
    }

    listOfTasks.push(singleTask);

    this._storeAsyncStorageListOfTasks(listOfTasks);
  }

  _clearDate () {
    const task = this.state.selectedTask;
    task.dueDate = undefined;
    task.formattedDate = undefined;
  }

  _completeTask (rowID) {
    this._retrieveAsyncStorageListOfTasks((listOfTasks) => {
      listOfTasks[rowID].completed = !listOfTasks[rowID].completed;

      this._storeAsyncStorageListOfTasks(listOfTasks);
    })
  }

  _onLongPress (rowID) {
    this.setState({
      currentRowID: rowID,
      selectedTask: this.state.listOfTasks[rowID]
    })

    const uneditedTask = Object.assign({}, this.state.listOfTasks[rowID]);

    this._renderEditTaskView(uneditedTask)
  }

  _popAndClearSelection () {
    this.props.navigator.pop();

    this.setState({
      currentRowID: undefined,
      selectedTask: undefined
    });
  }

  _renderEditTaskView (uneditedTask) {
    this.props.navigator.push({
      component: EditTask,
      passProps: {
        details: this.state.selectedTask,
        changeTaskDue: (date, formattedDate) => this._updateDueDate(date, formattedDate),
        changeTaskName: (name) => this._updateTask('text', name),
        changeTaskStatus: (completed) => this._updateTask('completed', completed),
        clearDate: () => this._clearDate()
      },
      title: this.state.selectedTask.text,
      leftButtonTitle: 'Cancel',
      rightButtonTitle: 'Save',
      onLeftButtonPress: () => this._revertDetails(uneditedTask),
      onRightButtonPress: () => this._saveEditedTask()
    })
  }

  _retrieveAsyncStorageListOfTasks (callback) {
    AsyncStorage.getItem('listOfTasks', (error, result) => {
      const parsedResult = JSON.parse(result);
      const listOfTasks = parsedResult ? parsedResult.slice() : [];

      callback(listOfTasks);
    })
  }

  _revertDetails (uneditedTask) {
    this.state.listOfTasks[this.state.currentRowID] = uneditedTask;

    this._popAndClearSelection();
  }

  _saveEditedTask () {
    this._retrieveAsyncStorageListOfTasks((listOfTasks) => {
      listOfTasks[this.state.currentRowID] = this.state.selectedTask;

      this._popAndClearSelection();
      this._storeAsyncStorageListOfTasks(listOfTasks);
    })

  }

  _storeAsyncStorageListOfTasks (listOfTasks) {
    AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks), () => {
      this._updateList()
    });
  }

  _updateDueDate (date, formattedDate) {
    this._updateTask('dueDate', date);
    this._updateTask('formattedDate', formattedDate);
  }

  _updateList () {
    this._retrieveAsyncStorageListOfTasks((listOfTasks) => {
      this.setState({
        text: '',
        listOfTasks: listOfTasks
      })
    });
  }

  _updateTask (key, value) {
    const task = this.state.selectedTask;
    task[key] = value;
  }

}

export default TasksList;
