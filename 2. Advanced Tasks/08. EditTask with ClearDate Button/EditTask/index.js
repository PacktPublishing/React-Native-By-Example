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
      expanded: false,
      formattedDate: this._formatDate(date)
    }
  }

  render () {
    return (
      <View style={ styles.editTaskContainer }>
        <View style={ [styles.container, { maxHeight: this.state.expanded ? this.state.datePickerHeight : 40 }] }>
          <ExpandableCell
            title={{
              empty: 'Set Reminder',
              assigned: 'Due On'
            }}
            childrenHeight={ this.state.datePickerHeight }
            dateSelected={ this.state.dateSelected }
            dueDateAssigned={ this.props.dueDate }
            secondaryDetails={ this.state.formattedDate }
            onPress={ () => this._onExpand() }>
            <DatePickerIOS
              date={ this.state.date }
              onDateChange={ (date) => this._onDateChange(date) }
              onLayout={ (event) => this._getComponentHeight(event) }
              style={ styles.datePicker } />
          </ExpandableCell>
        </View>
        <View style={ styles.container }>
          <TouchableHighlight
            onPress={ () => this._clearDate() }
            style={ styles.clearDateRow }
            underlayColor={ '#D3D3D3' }>
            <View
              style={ styles.nodaterow }>
              <Text
                style={ styles.clearDateText }>
                Clear Date
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  _clearDate () {
    this.setState({
      dateSelected: false,
      formattedDate: undefined
    })
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

  _onExpand () {
    this.setState({
      expanded: !this.state.expanded
    })
  }

}

export default EditTask;
