import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import {
  Button,
  DatePickerIOS,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';

import ExpandableCell from '../ExpandableCell';
import styles from './styles';

export default class EditTask extends Component {
  static propTypes = {
    changeTaskCompletionStatus: PropTypes.func.isRequired,
    changeTaskDueDate: PropTypes.func.isRequired,
    changeTaskName: PropTypes.func.isRequired,
    clearTaskDueDate: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    due: PropTypes.string,
    formattedDate: PropTypes.string,
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
        <View style={ [styles.expandableCellContainer, { maxHeight: this.state.expanded ? this.state.datePickerHeight : 40 }]}>
          <ExpandableCell
            expanded={ this.state.expanded }
            onPress={ () => this._onExpand() }
            title={ this.state.dateSelected ? dueDateSetTitle : noDueDateTitle }>
            <DatePickerIOS
              date={ this.state.date }
              onDateChange={ (date) => this._onDateChange(date) }
              onLayout={ (event) => this._getDatePickerHeight(event) }
            />
          </ExpandableCell>
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
        <View style={ styles.clearDateButtonContainer }>
          <Button
            color={ '#B44743' }
            disabled={ this.state.dateSelected ? false : true }
            onPress={ () => this._clearDate() }
            title={ 'Clear Date' }
          />
        </View>
      </View>
    );
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

  _onDateChange (date) {
    const formattedDate = this._formatDate(date);

    this.setState({
      date,
      dateSelected: true,
      formattedDate: formattedDate
    });

    this.props.changeTaskDueDate(date, formattedDate);
  }

  _onExpand () {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  _onSwitchToggle (completed) {
    this.setState({
      completed
    });

    this.props.changeTaskCompletionStatus(completed);
  }
}
