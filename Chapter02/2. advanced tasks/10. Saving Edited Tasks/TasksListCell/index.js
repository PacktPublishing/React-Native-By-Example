import React, { Component } from 'react';

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles';

class TasksListCell extends Component {
  render () {
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          onLongPress={ () => this.props.onLongPress() }
          onPress={ () => this.props.onPress(this.props.id) }
          underlayColor="#D5DBDE" >
          <View style={ styles.textContainer }>
            <Text
              style={ [styles.rowText, { textDecorationLine: this.props.completed ? 'line-through' : 'none' }] }> { this.props.text } </Text>
            <Text style={ styles.dueDateText }> { this._getDueDate() } </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _getDueDate () {
    if (this.props.formattedDate && !this.props.completed) {
      return 'Due ' + this.props.formattedDate;
    }

    if (!this.props.formattedDate) {
      return '';
    }
  }
}

export default TasksListCell
