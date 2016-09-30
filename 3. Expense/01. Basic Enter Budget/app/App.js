import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as dateMethods from './utils/dateMethods';
import * as storageMethods from './utils/storageMethods';

import EnterBudget from './views/EnterBudget';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      budgetSet: undefined,
      month: undefined,
      year: undefined,
    }
  }

  componentWillMount () {
    const month = dateMethods.getMonth();
    const year = dateMethods.getYear();

    storageMethods.checkCurrentMonthBudget(dateMethods.getMonth(), dateMethods.getYear())
      .then((response) => {
        let budgetSet = undefined;

        if (response) {
          budgetSet = response;
        }

        if (response === false) {
          budgetSet = false;
        }

        this.setState({
          budgetSet: budgetSet,
          month: dateMethods.getMonth(),
          year: dateMethods.getYear()
        })

        if (budgetSet === false) {
          this._renderEnterBudgetScreen();
        }
      });
  }

  render () {
    return (
      <View style={ styles.container }>
      </View>
    )
  }

  _renderEnterBudgetScreen () {
    this.props.navigator.push({
      component: EnterBudget,
      title: 'Enter Your Budget',
      navigationBarHidden: true,
      passProps: {
        month: this.state.month,
        year: this.state.year,
        saveBudget: (budget) => this._saveBudget(budget)
      }
    })
  }

  _saveBudget (budget) {
    this.setState({
      budgetSet: budget
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65
  }
})

export default App;
