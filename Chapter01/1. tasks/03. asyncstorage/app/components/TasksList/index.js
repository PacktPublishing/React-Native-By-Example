import React, { Component } from 'react';

import {
  AsyncStorage,
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
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={ (rowData) => this._renderRowData(rowData) }
        />
      </View>
    );
  }

  async _addTask () {
    const listOfTasks = [...this.state.listOfTasks, this.state.text];

    await AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

    this._updateList();
  }

  _changeTextInputValue (text) {
    this.setState({
      text
    });
  }

  _renderRowData (rowData) {
    return (
      <Text>{ rowData }</Text>
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