import React, { Component } from 'react';
// Installed MomentJS dependency from npm
import moment from 'moment';

import {
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
      date: new Date()
    }
  }

  render () {
    // Two set strings to show in ExpandableCell
    const noDueDateTitle = 'Set Reminder';
    const dueDateSetTitle = 'Due On ' + this.state.formattedDate;

    // 1. Wraps ExpandableCell around DatePickerIOS, automatically
    // assigning DatePickerIOS as a child of ExpandableCell
    // and accessible through props.children
    // ----
    // 2. The title prop for ExpandableCell runs conditional logic
    // to find out whether or not a date has been selected in the
    // EditTask component, which is set during _onDateChange.
    // It displays either the noDueDateTitle or dueDateSetTitle
    // depending on this logic
    return (
      <View style={ styles.editTaskContainer }>
        <ExpandableCell
          title={ this.state.dateSelected ? dueDateSetTitle : noDueDateTitle }>
          <DatePickerIOS
            date={ this.state.date }
            onDateChange={ (date) => this._onDateChange(date) }
            style={ styles.datePicker }
          />
        </ExpandableCell>
      </View>
    );
  }

  _formatDate (date) {
    // MomentJS formatting
    return moment(date).format('lll');
  }

  _onDateChange (date) {
    this.setState({
      date: date,
      dateSelected: true,
      formattedDate: this._formatDate(date)
    });
  }
}
