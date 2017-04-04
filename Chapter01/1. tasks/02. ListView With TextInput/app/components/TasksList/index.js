import React, { Component } from 'react';

import {
  ListView,
  Text,
  TextInput,
  View
} from 'react-native';

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
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={ (rowData) => this._renderRowData(rowData) }
        />
      </View>
    );
  }

  _addTask () {
    const newListOfTasks = [...this.state.listOfTasks, this.state.text];

    this.setState({
      listOfTasks: newListOfTasks
    });

    this._changeTextInputValue('');
  }

  _changeTextInputValue (text) {
    this.setState({
      text: text
    });
  }

  _renderRowData (rowData) {
    return (
      <Text>{ rowData }</Text>
    )
  }
}