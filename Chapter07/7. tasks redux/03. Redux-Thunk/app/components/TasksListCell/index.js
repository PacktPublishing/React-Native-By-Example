import React, { Component, PropTypes } from 'react';

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles';

export default class TasksListCell extends Component {
  static propTypes = {
    completed: PropTypes.bool.isRequired,
    formattedDate: PropTypes.string,
    id: PropTypes.string.isRequired,
    onLongPress: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);
  }

  render () {
    const isCompleted = this.props.completed ? 'line-through' : 'none';

    return (
      <View style={ styles.tasksListCellContainer }>
        <TouchableHighlight
          onLongPress={ () => this.props.onLongPress() }
          onPress={ () => this.props.onPress(this.props.id) }
          underlayColor={ '#D5DBDE' } >
          <View style={ styles.tasksListCellTextRow }>
            <Text style={ [styles.taskNameText, { textDecorationLine: isCompleted }] }>
              { this.props.text }
            </Text>
            <Text style={ styles.dueDateText }>
              { this._getDueDate() }
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _getDueDate () {
    if (this.props.formattedDate && !this.props.completed) {
      return 'Due ' + this.props.formattedDate;
    }

    return '';
  }
}
