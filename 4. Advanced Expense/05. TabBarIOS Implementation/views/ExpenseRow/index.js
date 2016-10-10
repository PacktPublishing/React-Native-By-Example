import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as iconMethods from '../../utils/iconMethods';

class ExpenseRow extends Component {
  render () {
    return (
      <View style={ styles.container }>
        <View style={ styles.iconContainer }>
          { iconMethods.getIconComponent(this.props.category) }
        </View>
        <Text style={ styles.description }>
          { this.props.description }
        </Text>
        <Text style={ styles.amount }>
          {this.props.amount }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  amount: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    padding: 10
  },
  description: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    width: 200
  },
  iconContainer: {
    flex: 1,
    paddingLeft: 10
  }
});

export default ExpenseRow;
