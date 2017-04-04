import React, { Component, PropTypes } from 'react';

import {
  Alert,
  BackAndroid,
  ListView,
  Navigator,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles';
import * as dateMethods from '../../utils/dateMethods';
import * as storageMethods from '../../utils/storageMethods';

import ExpenseRow from '../ExpenseRow';

export default class CurrentMonthExpenses extends Component {
  static propTypes = {
    budget: PropTypes.string.isRequired,
    expenses: PropTypes.array.isRequired,
    isPreviousMonth: PropTypes.bool,
    month: PropTypes.string.isRequired,
    spent: PropTypes.number.isRequired,
    updateExpenses: PropTypes.func.isRequired,
    year: PropTypes.string.isRequired,
  }

  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    }
  }

  componentWillMount () {
    BackAndroid.addEventListener('hardwareButtonPress', () => this._backButtonPress());
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareButtonPress', () => this._backButtonPress())
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.state.expenses || this.props.expenses || []);

    return (
      <View style={ [styles.currentMonthExpensesContainer, this.props.isPreviousMonth ? {marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight} : {}] }>
        <View style={ styles.currentMonthExpensesHeader }>
          <Text style={ styles.headerText }>
            Your { dateMethods.getMonthString(this.props.month) + ' ' + this.props.year } budget:
          </Text>
          <Text style={ styles.subText }>
            { this.props.spent } of { this.props.budget } spent
          </Text>
          { this._renderProgressIndicator() }
        </View>
        <View style={ styles.listViewContainer }>
          <ListView
            automaticallyAdjustContentInsets={ false }
            dataSource={ dataSource }
            enableEmptySections={ true }
            renderRow={ (rowData, sectionID, rowID) => this._renderRowData(rowData, rowID) }
            renderSeparator={ (sectionID, rowID) => this._renderRowSeparator(sectionID, rowID) }
          />
        </View>
      </View>
    )
  }

  _backButtonPress () {
    if (this.props.isPreviousMonth) {
      this.props.navigator.pop();
      return true;
    }
  }

  _cancelAlert () {
    return false;
  }

  async _deleteItem (rowID) {
    let newExpensesArray;

    if (this.state.expenses) {
      newExpensesArray = [...this.state.expenses];
    }

    if (!this.state.expenses) {
      newExpensesArray = [...this.props.expenses];
    }

    newExpensesArray.splice(rowID, 1);

    await storageMethods.updateMonthExpensesArray(this.props.month, this.props.year, newExpensesArray);

    this.setState({
      expenses: newExpensesArray
    });

    this.props.updateExpenses();
  }

  _getProgressViewAmount () {
    return this.props.spent/this.props.budget;
  }

  _onLongPress (rowID) {
    const alertOptions = [
      {text: 'Cancel', onPress: () => this._cancelAlert() },
      {text: 'Delete', style: 'destructive', onPress: () => this._deleteItem(rowID)}
    ];

    Alert.alert('Delete Item', 'Do you wish to delete this item?', alertOptions)
  }

  _renderProgressIndicator () {
    if (Platform.OS === 'ios') {
      return (
        <ProgressViewIOS
          progress={ this._getProgressViewAmount() }
          progressTintColor={ '#A3E75A' }
          style={ styles.progressView }
        />
      )
    }

    return (
      <View style={ styles.progressView }>
        <ProgressBarAndroid
          color={ '#A3E75A' }
          indeterminate={ false }
          progress={ this._getProgressViewAmount() }
          styleAttr={ 'Horizontal' }
        />
      </View>
    )
  }

  _renderRowData (rowData, rowID) {
    if (rowData) {
      return (
        <ExpenseRow
          amount={ rowData.amount }
          category={ rowData.category }
          description={ rowData.description }
          onLongPress={ () => this._onLongPress(rowID) }
        />
      )
    }
  }

  _renderRowSeparator (sectionID, rowID) {
    return (
      <View
        key={ rowID }
        style={ styles.rowSeparator }
      />
    )
  }
};
