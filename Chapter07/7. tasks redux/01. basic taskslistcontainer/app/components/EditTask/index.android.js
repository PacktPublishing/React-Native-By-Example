import React, { Component, PropTypes } from 'react';
import moment from 'moment';

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
  static propTypes = {
    changeTaskDueDate: PropTypes.func.isRequired,
    changeTaskName: PropTypes.func.isRequired,
    changeTaskCompletionStatus: PropTypes.func.isRequired,
    clearTaskDueDate: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    due: PropTypes.string,
    formattedDate: PropTypes.string,
    saveCurrentEditedTask: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);

    const date = this.props.due;

    this.state = {
      completed: this.props.completed,
      date: new Date(this.props.date),
      dateSelected: this.props.formattedDate,
      formattedDate: this.props.formattedDate,
      expanded: false,
      text: this.props.text
    }
  }

  componentWillMount () {
    BackAndroid.addEventListener('hardwareButtonPress', () => this._backButtonPress());
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareButtonPress', () => this._backButtonPress())
  }

  render () {
    const noDueDateTitle = 'Set Reminder';
    const dueDateSetTitle = 'Due On ' + this.state.formattedDate || this.props.formattedDate;

    return (
      <View style={ styles.editTaskContainer }>
        <View>
          <TextInput
            autoCorrect={ false }
            onChangeText={ (text) => this._changeTextInputValue(text) }
            returnKeyType={ 'done' }
            style={ styles.textInput }
            value={ this.state.text }
          />
        </View>
        <View style={ styles.androidButtonContainer }>
          <Button
            color={ '#80B546' }
            title={ this.state.dateSelected ? dueDateSetTitle : noDueDateTitle }
            onPress={ () => this._showAndroidDatePicker() }
          />
        </View>
        <View style={ styles.switchContainer } >
          <Text style={ styles.switchText } >
            Completed
          </Text>
          <Switch
            onValueChange={ (value) => this._onSwitchToggle(value) }
            value={ this.state.completed }
          />
        </View>
        <View style={ styles.androidButtonContainer }>
          <Button
            color={ '#B44743' }
            disabled={ this.state.dateSelected ? false : true }
            onPress={ () => this._clearDate() }
            title={ 'Clear Date' }
          />
        </View>
        <View style={ styles.saveButton }>
          <Button
            color={ '#4E92B5' }
            onPress={ () => this.props.saveCurrentEditedTask() }
            title={ 'Save Task' }
          />
        </View>
      </View>
    );
  }

  _backButtonPress () {
    this.props.navigator.pop();
    return true;
  }

  async _showAndroidDatePicker () {
    const options = {
      date: this.state.date
    };

    const { action, year, month, day } = await DatePickerAndroid.open(options);

    if (action === DatePickerAndroid.dismissedAction) {
      return;
    }

    this.setState({
      day,
      month,
      year
    });

    this._showAndroidTimePicker();
  }

  async _showAndroidTimePicker () {
    const { action, minute, hour } = await TimePickerAndroid.open();

    if (action === TimePickerAndroid.dismissedAction) {
      return;
    }

    this.setState({
      hour,
      minute
    });

    this._onDateChange();
  }

  _changeTextInputValue (text) {
    this.setState({
      text
    })

    this.props.changeTaskName(text);
  }

  _clearDate () {
    this.setState({
      dateSelected: false
    })

    this.props.clearTaskDueDate();
  }

  _getDatePickerHeight (event) {
    this.setState({
      datePickerHeight: event.nativeEvent.layout.width
    });
  }

  _formatDate (date) {
    return moment(date).format('lll');
  }

  _onDateChange () {
    const date = new Date(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minute);

    const formattedDate = this._formatDate(date);

    this.setState({
      date,
      dateSelected: true,
      formattedDate: formattedDate
    });

    this.props.changeTaskDueDate(date, formattedDate);
  }

  _onSwitchToggle (completed) {
    this.setState({
      completed
    });

    this.props.changeTaskCompletionStatus(completed);
  }
}
