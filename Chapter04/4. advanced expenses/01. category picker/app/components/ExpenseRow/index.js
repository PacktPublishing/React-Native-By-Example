import React from 'react';

import {
  Text,
  View
} from 'react-native';

import styles from './styles';

export default (props) => {
  return (
    <View style={ styles.expenseRowContainer }>
      <Text style={ styles.descriptionText }>
        { props.description }
      </Text>
      <Text style={ styles.amountText }>
        { props.amount }
      </Text>
    </View>
  )
}
