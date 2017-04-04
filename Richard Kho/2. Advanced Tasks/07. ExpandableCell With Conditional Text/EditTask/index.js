import React, { Component } from 'react';

import {
  DatePickerIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import ExpandableCell from '../ExpandableCell';
import styles from './styles';

class EditTask extends Component {
  constructor (props) {
    super (props);

    const date = new Date();

    this.state = {
      date: date,
      formattedDate: this._formatDate(date)
    }
  }

  render () {
    return (
      <View style={ styles.editTaskContainer }>
        <ExpandableCell
          title={{
            empty: 'Set Reminder',
            assigned: 'Due On'
          }}
          childrenHeight={ this.state.datePickerHeight }
          dateSelected={ this.state.dateSelected }
          dueDateAssigned={ this.props.dueDate }
          secondaryDetails={ this.state.formattedDate }>
          <DatePickerIOS
            date={ this.state.date }
            onDateChange={ (date) => this._onDateChange(date) }
            onLayout={ (event) => this._getComponentHeight(event) }
            style={ styles.datePicker } />
        </ExpandableCell>
      </View>
    )
  }

  _formatDate (date) {
    return date.toDateString() + ' ' + date.toLocaleTimeString(navigator.language, { hour:'2-digit', minute:'2-digit'})
  }

  _getComponentHeight (event) {
    this.setState({
      datePickerHeight: event.nativeEvent.layout.height
    });
  }

  _onDateChange (date) {
    this.setState({
      date: date,
      dateSelected: true,
      formattedDate: this._formatDate(date)
    });
  }

}

export default EditTask;
