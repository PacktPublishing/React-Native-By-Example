import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class ExpenseRow extends Component {
  render () {
    return (
      <View style={ styles.container }>
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
    fontSize: 20,
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
    fontSize: 20,
    textAlign: 'left'
  }
});

export default ExpenseRow;
