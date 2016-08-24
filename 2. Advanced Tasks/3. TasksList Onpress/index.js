import React, { Component } from 'react';

import {
  AlertIOS,
  AsyncStorage,
  ListView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import EditTask from '../EditTask';
import TasksListCell from '../TasksListCell';

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
      text: this.state.text
    }

    listOfTasks.push(singleTask);

    this._storeAsyncStorageListOfTasks(listOfTasks);
  }

  _completeTask (rowID) {
    this._retrieveAsyncStorageListOfTasks((listOfTasks) => {
      listOfTasks[rowID].completed = !listOfTasks[rowID].completed;

      this._storeAsyncStorageListOfTasks(listOfTasks);
    })
  }

  _onLongPress (rowID) {
    this.props.navigator.push({
      component: EditTask,
      passProps: {
        details: this.state.listOfTasks[rowID]
      },
      title: this.state.listOfTasks[rowID].text
    })
  }

  _retrieveAsyncStorageListOfTasks (callback) {
    AsyncStorage.getItem('listOfTasks', (error, result) => {
      const parsedResult = JSON.parse(result);
      const listOfTasks = parsedResult.slice() || [];

      callback(listOfTasks);
    })
  }

  _storeAsyncStorageListOfTasks (listOfTasks) {
    AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks), () => {
      this._updateList()
    });
  }

  _updateList () {
    this._retrieveAsyncStorageListOfTasks((listOfTasks) => {
      this.setState({
        text: '',
        listOfTasks: listOfTasks
      })
    });
  }
}

export default TasksList;
