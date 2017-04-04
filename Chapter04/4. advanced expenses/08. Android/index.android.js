import React, { Component } from 'react';
import {
  AppRegistry,
  DrawerLayoutAndroid,
  Navigator,
  StyleSheet,
  View
} from 'react-native';

import App from './app/App';
import Drawer from './app/components/Drawer';
import CurrentMonthExpenses from './app/components/CurrentMonthExpenses';
import EnterBudget from './app/components/EnterBudget';
import PreviousMonthsList from './app/components/PreviousMonthsList';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as storageMethods from './app/utils/storageMethods';

class Expenses extends Component {
  constructor (props) {
    super (props);
    this.state = {
      expenses: undefined,
      visibleRoutes: [
        { title: 'This Month', index: 0 },
        { title: 'Past Months', index: 2 }
      ]
    }
  }

  componentWillMount () {
    this._updateExpenses();
  }

  render() {
    const routes = [
      { title: 'Expenses', index: 0 },
      { title: 'Enter Your Budget', index: 1 },
      { title: 'Previous Month List', index: 2 },
      { title: 'Past Expenses', index: 3}
    ];

    return (
      <View style={ styles.container }>
        <DrawerLayoutAndroid
          drawerLockMode={ 'unlocked' }
          ref={ 'drawer' }
          renderNavigationView={ () => this._renderDrawerLayout() }
        >
          <Icon.ToolbarAndroid
            title="Expense"
            titleColor="white"
            navIconName="menu"
            height={ 56 }
            backgroundColor="blue"
            onIconClicked={ () => this._openDrawer() }
          />
          <Navigator
            initialRoute={{ index: 0 }}
            ref={ 'navigator' }
            renderScene={ (routes, navigator) => this._renderScene(routes, navigator) }
          />
        </DrawerLayoutAndroid>
      </View>
    );
  }

  _openDrawer () {
    this.refs['drawer'].openDrawer();
  }

  _navigateTo (index) {
    this.refs['navigator'].push({
      index: index
    });
    this.refs['drawer'].closeDrawer();
  }

  _renderDrawerLayout () {
    return (
      <Drawer
        navigateTo={ (index) => this._navigateTo(index) }
        routes={ this.state.visibleRoutes }
      />
    )
  }

  _renderScene (route, navigator) {
    if (route.index === 0) {
      return (
        <App
          title={ route.title }
          navigator={ navigator }
          updateExpenses={ () => this._updateExpenses() }
        />
      )
    }

    if (route.index === 1) {
      return (
        <EnterBudget
          title={ route.title }
          navigator={ navigator }
          { ...route.passProps }
        />
      )
    }

    if (route.index === 2) {
      return (
        <PreviousMonthsList
          title={ route.title }
          navigator={ navigator }
          expenses={ this.state.expenses }
          updateExpenses={ () => this._updateExpenses() }
        />
      )
    }

    if (route.index === 3) {
      return (
        <CurrentMonthExpenses
          title={ route.title }
          navigator={ navigator }
          { ...route.passProps }
        />
      )
    }
  }

  async _updateExpenses () {

    let response = await storageMethods.getAsyncStorage();

    if (response) {
      this.setState({
        expenses: response
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('Expenses', () => Expenses);
