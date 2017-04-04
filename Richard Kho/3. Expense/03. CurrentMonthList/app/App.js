import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as dateMethods from './utils/dateMethods';
import * as storageMethods from './utils/storageMethods';

import AddExpense from './views/AddExpense';
import CurrentMonthList from './views/CurrentMonthList';
import EnterBudget from './views/EnterBudget';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      budgetSet: undefined,
      currentMonthExpenses: [],
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
      })
      .then(() => {
        if (this.state.budgetSet) {
          this._updateCurrentMonth();
        }
      })
  }

  render () {
    return (
      <View style={ styles.container }>
        <CurrentMonthList
          budgetSet={ this.state.budgetSet }
          list={ this.state.currentMonthExpenses }
          month={ this.state.month }/>
        <AddExpense
          month={ this.state.month }
          year={ this.state.year }
          updateList={ () => this._updateCurrentMonth() } />
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

  _updateCurrentMonth () {
    storageMethods.getBudgetForSpecificMonth(this.state.month, this.state.year)
      .then((response) => {
        this.setState({
          currentMonthExpenses: response.expenses
        });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65
  },
  red: {
    backgroundColor: 'red'
  }
})

export default App;
