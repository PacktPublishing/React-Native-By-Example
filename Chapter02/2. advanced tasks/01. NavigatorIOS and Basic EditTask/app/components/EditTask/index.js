import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';

import styles from './styles';

export default class EditTask extends Component {
  render () {
    return (
      <View style={ styles.editTaskContainer }>
        <Text style={ styles.editTaskText }>Editing Task</Text>
      </View>
    );
  }
}
