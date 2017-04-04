import React, { Component } from 'react';
import moment from 'moment';

import {
  Button,
  DatePickerIOS,
  Text,
  View
} from 'react-native';

import ExpandableCell from '../ExpandableCell';
import styles from './styles';

export default class EditTask extends Component {
  constructor (props) {
    super (props);

    this.state = {
      date: new Date(),
      expanded: false
    }
  }

  render () {
    const noDueDateTitle = 'Set Reminder';
    const dueDateSetTitle = 'Due On ' + this.state.formattedDate;

    return (
      <View style={ styles.editTaskContainer }>
        <View style={ [styles.expandableCellContainer, { maxHeight: this.state.expanded ? this.state.datePickerHeight : 40 }]}>
          <ExpandableCell
            expanded={ this.state.expanded }
            onPress={ () => this._onExpand() }
            title={ this.state.dateSelected ? dueDateSetTitle : noDueDateTitle }>
            <DatePickerIOS
              date={ this.state.date }
              onDateChange={ (date) => this._onDateChange(date) }
              onLayout={ (event) => this._getDatePickerHeight(event) }
              style={ styles.datePicker }
            />
          </ExpandableCell>
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

  _clearDate () {
    this.setState({
      dateSelected: false
    })
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
    this.setState({
      date,
      dateSelected: true,
      formattedDate: this._formatDate(date)
    });
  }

  _onExpand () {
    this.setState({
      expanded: !this.state.expanded
    });
  }
}
