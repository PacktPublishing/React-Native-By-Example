import React from 'react';

import {
  Text,
  View
} from 'react-native';

import * as iconMethods from '../../utils/iconMethods';
import styles from './styles';

export default (props) => {
  return (
    <View style={ styles.expenseRowContainer }>
      <View style={ styles.icon }>
        { iconMethods.getIconComponent(props.category) }
      </View>
      <Text style={ styles.descriptionText }>
        { props.description }
      </Text>
      <Text style={ styles.amountText }>
        { props.amount }
      </Text>
    </View>
  )
}
