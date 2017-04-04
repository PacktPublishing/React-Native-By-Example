import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from './styles';

export default (props) => {
  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Text style={ styles.name }>
          { props.name }
        </Text>
      </View>
      <View style={ styles.body }>
        <Text style={ styles.comment }>
          { props.message }
        </Text>
      </View>
    </View>
  )
}
