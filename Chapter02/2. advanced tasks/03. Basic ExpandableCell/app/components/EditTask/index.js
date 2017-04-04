import React, { Component } from 'react';

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
      date: new Date();
    }
  }

  render () {
    return (
      <View style={ styles.editTaskContainer }>
        <ExpandableCell title={ 'Due On' }>
          <DatePickerIOS
            date={ this.state.date }
            onDateChange={ (date) => this._onDateChange(date) }
            style={ styles.datePicker }
          />
        </ExpandableCell>
      </View>
    );
  }

  _onDateChange (date) {
    this.setState({
      date: date,
      dateSelected: true,
      formattedDate: this._formatDate(date)
    });
  }
}
