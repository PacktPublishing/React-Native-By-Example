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
    changeTaskDueDate: PropTypes.func.isRequired,
    changeTaskName: PropTypes.func.isRequired,
    changeTaskCompletionStatus: PropTypes.func.isRequired,
    clearTaskDueDate: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    due: PropTypes.string,
    formattedDate: PropTypes.string,
    text: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);
  }

  render () {
    const noDueDateTitle = 'Set Reminder';
    const dueDateSetTitle = 'Due On ' + this.state.formattedDate || this.props.formattedDate;

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
        <View style={ [styles.expandableCellContainer, { maxHeight: this.props.expanded ? this.state.datePickerHeight : 40 }]}>
          <ExpandableCell
            childrenHeight={ this.state.datePickerHeight }
            expanded={ this.props.expanded }
            onPress={ () => this.props.onExpand(this.props.expanded) }
            title={ this.selectedTaskObject.dateSelected ? dueDateSetTitle : noDueDateTitle }>
            <DatePickerIOS
              date={ this.props.date }
              onDateChange={ (date) => this.props.onDateChange(date) }
              onLayout={ (event) => this._getDatePickerHeight(event) }
            />
          </ExpandableCell>
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
        <View style={ styles.clearDateButtonContainer }>
          <Button
            color={ '#B44743' }
            disabled={ this.props.dateSelected ? false : true }
            onPress={ () => this.props.clearDate() }
            title={ 'Clear Date' }
          />
        </View>
      </View>
    );
  }

  _getDatePickerHeight (event) {
    this.setState({
      datePickerHeight: event.nativeEvent.layout.width
    });
  }

  _formatDate (date) {
    return moment(date).format('lll');
  }
}
