import React, { Component } from 'react';

import {
  NavigatorIOS,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

import * as dateMethods from './utils/dateMethods';
import * as storageMethods from './utils/storageMethods';

import AddExpenses from './components/AddExpenses';
import CurrentMonthExpenses from './components/CurrentMonthExpenses';
import EnterBudget from './components/EnterBudget';
import PreviousMonthsList from './components/PreviousMonthsList';

export default class App extends Component {
  constructor (props) {
    super();

    this.state = {
      budget: '',
      expenses: {},
      selectedTab: 'currentMonth',
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
      <TabBarIOS>
        <Icon.TabBarItemIOS
          iconName={ 'usd' }
          iconSize={ 20 }
          onPress={ () => this._setSelectedTab('currentMonth') }
          title={ 'Current Month' }
          selected={ this.state.selectedTab === 'currentMonth' }
        >
          { this._renderCurrentMonthExpenses(this.state.currentMonthExpenses) }
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          iconName={ 'history' }
          iconSize={ 20 }
          onPress={ () => this._setSelectedTab('previousMonths') }
          title={ 'Previous Months' }
          selected={ this.state.selectedTab === 'previousMonths' }
        >
          { this._renderPreviousMonthsList(this.state.expenses) }
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    )
  }

  _renderCurrentMonthExpenses () {
    return (
      <View style={ styles.appContainer }>
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
      component: EnterBudget,
      navigationBarHidden: true,
      passProps: {
        monthString: dateMethods.getMonthString(this.state.month),
        saveAndUpdateBudget: (budget) => this._saveAndUpdateBudget(budget),
        updateExpenses: () => this._updateExpenses()
      }
    });
  }

  _renderPreviousMonthsList () {
    return (
      <NavigatorIOS
        initialRoute={{
          component: PreviousMonthsList,
          title: 'Previous Months',
          passProps: {
            expenses: this.state.expenses,
            updateExpenses: () => this._updateExpenses()
          }
        }}
        style={ styles.previousMonthsContainer }
      />
    )
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
