import React, { Component } from 'react';
import {
  ListView,
  Platform,
  TextInput,
  View
} from 'react-native';

import EditTaskContainer from '../../containers/EditTaskContainer';
import TasksListCell from '../TasksListCell';
import styles from './styles';

export default class TasksList extends Component {
  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    };
  }

  componentWillMount () {
    this.props.getListOfTasksAndIndex();
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.props.listOfTasks);

    return (
      <View style={ styles.container }>
        <TextInput
          autoCorrect={ false }
          onChangeText={ (text) => this.props.onChangeText(text) }
          onSubmitEditing={ () => this.props.addTask(this.props.text, this.props.currentIndex) }
          returnKeyType={ 'done' }
          style={ Platform.OS === 'ios' ? styles.textInput : styles.androidTextInput }
          value={ this.props.text }
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

  _cancelEditingTask () {
    this.props.navigator.pop();
    this.props.resetSelectedTask();
  }

  _renderRowData (rowData, rowID) {
    return (
      <TasksListCell
        completed={ rowData.completed }
        formattedDate={ rowData.formattedDate }
        id={ rowID }
        onLongPress={ () => this._onLongPress(rowData) }
        onPress={ () => this.props.changeCompletionStatus(rowData.index) }
        text={ rowData.text }
      />
    )
  }

  _onLongPress (rowData) {
    this.props.changeCurrentlyEditedTask(rowData);

    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        component: EditTaskContainer,
        title: this.props.selectedTaskText,
        leftButtonTitle: 'Cancel',
        rightButtonTitle: 'Save',
        onLeftButtonPress: () => this._cancelEditingTask(),
        onRightButtonPress: () => this._saveEditedTask()
      });
      return;
    }

    this.props.navigator.push({
      index: 1
    });
  }

  _saveEditedTask () {
    this.props.navigator.pop();
    this.props.saveSelectedTaskDetails(this.props.selectedTaskObject);
  }
}