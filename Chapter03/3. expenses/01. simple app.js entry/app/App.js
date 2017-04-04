import React, { Component } from 'react';

import styles from './styles';

import {
  Text,
  View
} from 'react-native';

import * as storageMethods from './utils/storageMethods';

export default class App extends Component {
  constructor (props) {
    super();

    this.state = {
      budgetSet: undefined
    }
  }

  async componentWillMount () {
    let response = await storageMethods.checkCurrentMonthBudget();

    if (response !== false) {
      this.setState({
        budgetSet: response
      });

      return;
    }

    alert('You have not set a budget for this month!');
  }

  render () {
    return (
      <View style={ styles.appContainer }>
        <Text>
          Your budget is { this.state.budgetSet || 'not set' }!
        </Text>
      </View>
    )
  }
}
