import React, { Component } from 'react';

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class TasksListCell extends Component {
  constructor (props) {
    super (props);

    const isCompleted = this.props.completed ? 'line-through' : 'none';

    this.state = {
      textStyle: {
        fontSize: 20,
        textDecorationLine: isCompleted
      }
    }
  }

  _onPress () {
    this.props.onPress(this.props.id);

    if (!this.props.completed) {
      this.setState({
        isCompleted: true,
        textStyle: {
          fontSize: 20,
          textDecorationLine: 'line-through'
        }
      })

      return;
    }

    if (this.props.completed) {
      this.setState({
        isCompleted: false,
        textStyle: {
          fontSize: 20,
          textDecorationLine: 'none'
        }
      })
    }

  }

  render () {
    return (
      <View>
        <TouchableHighlight
          onPress = { () => this._onPress() }
          underlayColor = "#D5DBDE" >
          <Text
            style = { this.state.textStyle }> { this.props.text } </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default TasksListCell
