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
              style={ [styles.rowText, { textDecorationLine: this.props.completed ? 'line-through' : 'none' }] }> { this.props.data.text } </Text>
            <Text style={ styles.dueDateText }> { this._getDueDate() } </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _getDueDate () {
    if (this.props.data.formattedDate && !this.props.data.completed) {
      return 'Due ' + this.props.data.formattedDate;
    }

    if (!this.props.data.formattedDate) {
      return '';
    }
  }
}

export default TasksListCell
