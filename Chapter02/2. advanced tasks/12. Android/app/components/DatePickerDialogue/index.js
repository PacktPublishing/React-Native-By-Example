import React, { Component } from 'react';

import {
  Platform,
  Text,
  View
} from 'react-native';

import styles from './styles';

class DatePickerDialogue extends Component {
  render () {
    return (
      <View
        style={ styles.textRow }>
        <Text
          style={ styles.visibleContent } >
          { this._getTitle() }</Text>
        <Text
          style={ styles.secondaryDetails }>
          { this._getSubtitle() }</Text>
      </View>
    )
  }

  _getSubtitle () {
    if (this.props.textConditionals.dueDateAssigned || this.props.textConditionals.dateSelected) {
      return this.props.textConditionals.secondaryDetails
    }

    if (!this.props.textConditionals.dueDateAssigned && !this.props.textConditionals.dateSelected) {
      return 'None';
    }
  }

  _getTitle () {
    if (this.props.textConditionals.dueDateAssigned || this.props.textConditionals.dateSelected) {
      return this.props.textConditionals.assigned
    }

    if (!this.props.textConditionals.dueDateAssigned && !this.props.textConditionals.dateSelected) {
      return this.props.textConditionals.empty
    }
  }
}

export default DatePickerDialogue;
