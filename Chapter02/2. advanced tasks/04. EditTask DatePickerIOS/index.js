import React, { Component } from 'react';

import {
  DatePickerIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles';

class EditTask extends Component {
  constructor (props) {
    super (props);

    this.state = {
      date: new Date()
    }
  }

  render () {
    return (
      <View style={ styles.editTaskContainer }>
        <DatePickerIOS
          date={ this.state.date }
          onDateChange={ (date) => this._onDateChange(date) }
          style={ styles.datePicker } />
      </View>
    )
  }

  _onDateChange (date) {
    this.setState({
      date: date
    });
  }
}

export default EditTask;
