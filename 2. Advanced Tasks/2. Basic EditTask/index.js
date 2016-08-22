import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';

import styles from './styles';

class EditTask extends Component {
  render () {
    return (
      <View style = { styles.editTaskContainer }>
        <Text style = { styles.editTaskText }>EditTask List</Text>
      </View>
    )
  }
}

export default EditTask;
