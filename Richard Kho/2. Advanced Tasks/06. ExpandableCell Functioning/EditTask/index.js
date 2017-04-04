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
      date: date
    }
  }

  render () {
    return (
      <View style={ styles.editTaskContainer }>
        <ExpandableCell
          title={ 'Due Date' }
          childrenHeight={ this.state.datePickerHeight }
          dueDateAssigned={ this.props.dueDate }>
          <DatePickerIOS
            date={ this.state.date }
            onDateChange={ (date) => this._onDateChange(date) }
            onLayout={ (event) => this._getComponentHeight(event) }
            style={ styles.datePicker } />
        </ExpandableCell>
      </View>
    )
  }

  _getComponentHeight (event) {
    this.setState({
      datePickerHeight: event.nativeEvent.layout.height
    });
  }

  _onDateChange (date) {
    this.setState({
      date: date
    });
  }

}

export default EditTask;
