import React, { Component } from 'react';
import {
  ListView,
  Platform,
  TextInput,
  View
} from 'react-native';

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

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.props.listOfTasks);

    return (
      <View style={ styles.container }>
        <TextInput
          autoCorrect={ false }
          onChangeText={ (text) => this.props.onChangeText(text) }
          onSubmitEditing={ () => this.props.addTask(this.props.text) }
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

  _renderRowData (rowData, rowID) {
    return (
      <TasksListCell
        completed={ rowData.completed }
        formattedDate={ rowData.formattedDate }
        id={ rowID }
        onLongPress={ () => alert('placeholder') }
        onPress={ () => this.props.changeCompletionStatus(rowData.index) }
        text={ rowData.text }
      />
    )
  }
}