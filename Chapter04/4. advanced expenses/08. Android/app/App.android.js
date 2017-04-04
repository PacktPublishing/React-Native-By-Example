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

export default class App extends Component {
  constructor (props) {
    super();

    this.state = {
      budget: '',
      expenses: {},
    }
  }

  componentWillMount () {
    this.setState({
      spent: 0,
      currentMonthExpenses: [],
      month: dateMethods.getMonth(),
      year: dateMethods.getYear()
    });

    this._updateBudget();
  }

  render () {
    return (
      <View style={ styles.androidContainer }>
        { this._renderCurrentMonthExpenses() }
      </View>
    )
  }

  _renderCurrentMonthExpenses () {
    return (
      <View style={ styles.androidContainer }>
        <CurrentMonthExpenses
          budget={ this.state.budget }
          expenses={ this.state.currentMonthExpenses }
          month={ this.state.month }
          spent={ this.state.spent }
          updateExpenses={ () => this._updateExpenses() }
          year={ this.state.year }
        />
        <AddExpenses
          month={ this.state.month }
          updateExpenses={ () => this._updateExpenses() }
          year={ this.state.year }
        />
      </View>
    )
  }

  _renderEnterBudgetComponent () {
    this.props.navigator.push({
      index: 1,
      passProps: {
        monthString: dateMethods.getMonthString(this.state.month),
        saveAndUpdateBudget: (budget) => this._saveAndUpdateBudget(budget),
        updateExpenses: () => this._updateExpenses()
      }
    });
  }

  async _saveAndUpdateBudget (budget) {
    await storageMethods.saveMonthlyBudget(this.state.month, this.state.year, budget);

    this._updateBudget();
  }

  _setSelectedTab (selectedTab) {
    this.setState({
      selectedTab
    });
  }

  async _updateBudget () {
    let response = await storageMethods.checkCurrentMonthBudget();

    if (response !== false) {
      this.setState({
        budget: response.budget,
        spent: response.spent
      });

      this._updateExpenses();
      return;
    }

    this._renderEnterBudgetComponent();
  }

  async _updateExpenses () {

    let response = await storageMethods.getAsyncStorage();

    if (response) {
      let currentMonth = response[this.state.year][this.state.month];

      this.setState({
        budget: currentMonth.budget,
        currentMonthExpenses: currentMonth.expenses,
        expenses: response,
        spent: currentMonth.spent
      });
    }
  }
}
