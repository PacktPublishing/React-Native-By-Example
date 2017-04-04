import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';

import styles from './styles';

import * as dateMethods from './utils/dateMethods';
import * as storageMethods from './utils/storageMethods';

import AddExpenses from './components/AddExpenses';
import CurrentMonthExpenses from './components/CurrentMonthExpenses';
import EnterBudget from './components/EnterBudget';

export default class App extends Component {
  constructor (props) {
    super();

    this.state = {
      budget: undefined,
    }
  }

  componentWillMount () {

    this.setState({
      expenses: [],
      month: dateMethods.getMonth(),
      year: dateMethods.getYear()
    });

    this._updateBudget();
  }

  render () {
    return (
      <View style={ styles.appContainer }>
        <CurrentMonthExpenses
          budget={ this.state.budget || '0' }
          expenses={ this.state.expenses }
          month={ this.state.month }
          spent={ this.state.spent || 0 }
          year={ this.state.year }
        />
        <AddExpenses
          month={ this.state.month }
          updateCurrentMonthExpenses={ () => this._updateCurrentMonthExpenses() }
          year={ this.state.year }
        />
      </View>
    )
  }

  _renderEnterBudgetComponent () {
    this.props.navigator.push({
      component: EnterBudget,
      navigationBarHidden: true,
      passProps: {
        monthString: dateMethods.getMonthString(this.state.month),
        saveAndUpdateBudget: (budget) => this._saveAndUpdateBudget(budget)
      }
    });
  }

  async _saveAndUpdateBudget (budget) {
    await storageMethods.saveMonthlyBudget(this.state.month, this.state.year, budget);

    this._updateBudget();
  }

  async _updateBudget () {
    let response = await storageMethods.checkCurrentMonthBudget();

    if (response !== false) {
      this.setState({
        budget: response
      });

      this._updateCurrentMonthExpenses();
      return;
    }

    this._renderEnterBudgetComponent();
  }

  async _updateCurrentMonthExpenses () {
    let responseObject = await storageMethods.getMonthObject(this.state.month, this.state.year);

    if (responseObject) {
      this.setState({
        budget: responseObject.budget,
        expenses: responseObject.expenses,
        spent: responseObject.spent
      });
    }
  }
}
