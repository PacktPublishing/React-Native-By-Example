import React, { Component } from 'react';

import {
  BackAndroid,
  Button,
  DatePickerAndroid,
  Switch,
  Text,
  TextInput,
  TimePickerAndroid,
  View
} from 'react-native';

import styles from './styles';

export default class EditTask extends Component {
  constructor (props) {
    super (props);
  }

  componentWillMount () {
    BackAndroid.addEventListener('hardwareButtonPress', () => this._backButtonPress());
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareButtonPress', () => this._backButtonPress())
  }

  render () {
    const noDueDateTitle = 'Set Reminder';
    const dueDateSetTitle = 'Due On ' + this.props.selectedTaskObject.formattedDate;

    return (
      <View style={ styles.editTaskContainer }>
        <View>
          <TextInput
            autoCorrect={ false }
            onChangeText={ (text) => this.props.changeTextInputValue(text) }
            returnKeyType={ 'done' }
            style={ styles.textInput }
            value={ this.props.selectedTaskObject.text }
          />
        </View>
        <View style={ styles.androidButtonContainer }>
          <Button
            color={ '#80B546' }
            title={ this.props.selectedTaskObject.due ? dueDateSetTitle : noDueDateTitle }
            onPress={ () => this._showAndroidDatePicker() }
          />
        </View>
        <View style={ styles.switchContainer } >
          <Text style={ styles.switchText } >
            Completed
          </Text>
          <Switch
            onValueChange={ (value) => this.props.changeCompletedStatus(value) }
            value={ this.props.selectedTaskObject.completed }
          />
        </View>
        <View style={ styles.androidButtonContainer }>
          <Button
            color={ '#B44743' }
            disabled={ this.props.dateSelected ? false : true }
            onPress={ () => this.props.clearDate() }
            title={ 'Clear Date' }
          />
        </View>
        <View style={ styles.saveButton }>
          <Button
            color={ '#4E92B5' }
            onPress={ () => this._saveSelectedTaskDetails(this.props.selectedTaskObject) }
            title={ 'Save Task' }
          />
        </View>
      </View>
    );
  }

  _backButtonPress () {
    this.props.navigator.pop();
    this.props.resetSelectedTask();
    return;
  }

  _saveSelectedTaskDetails () {
    this.props.navigator.pop();
    this.props.saveSelectedTaskDetails(this.props.selectedTaskObject);
  }

  async _showAndroidDatePicker () {
    const options = {
      date: this.props.date
    };

    const { action, year, month, day } = await DatePickerAndroid.open(options);

    this._showAndroidTimePicker (day, month, year);
  }

  async _showAndroidTimePicker (day, month, year) {
    const { action, minute, hour } = await TimePickerAndroid.open();

    if (action === TimePickerAndroid.dismissedAction) {
      return;
    }

    const date = new Date(year, month, day, hour, minute);

    this.props.onDateChange(date);
  }
}
