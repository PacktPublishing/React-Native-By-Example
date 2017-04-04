import React, { Component } from 'react';

import {
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import * as dateMethods from './utils/dateMethods';
import * as storageMethods from './utils/storageMethods';
import * as iconMethods from './utils/iconMethods';

import AddExpense from './views/AddExpense';
import CurrentMonthList from './views/CurrentMonthList';
import EnterBudget from './views/EnterBudget';
import PreviousMonthsList from './views/PreviousMonthsList';

import Icon from 'react-native-vector-icons/FontAwesome';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      budgetSet: undefined,
      currentMonthExpenses: [],
      month: undefined,
      selectedTab: 'currentMonth',
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
      <TabBarIOS>
        <Icon.TabBarItemIOS
          title='Current Month'
          selected={ this.state.selectedTab === 'currentMonth' }
          iconName='usd'
          iconSize={20}
          onPress={ () => this._setSelectedTab('currentMonth') }>
          { this._renderCurrentMonthView() }
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title='Previous Months'
          selected={ this.state.selectedTab === 'previousMonths' }
          iconName='history'
          iconSize={20}
          onPress={ () => this._setSelectedTab('previousMonths') }>
          { this._renderPreviousMonthsView() }
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    )
  }

  _renderCurrentMonthView () {
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

  _renderPreviousMonthsView () {
    return (
      <PreviousMonthsList
        navigator={ this.props.navigator } />
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

  _setSelectedTab (tabName) {
    if (this.state.selectedTab !== tabName) {
      this.setState({
        selectedTab: tabName
      });
    }
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
    marginBottom: 48
  }
})

export default App;
