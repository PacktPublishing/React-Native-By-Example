import React, { Component, PropTypes } from 'react';

import {
  ListView,
  Navigator,
  ProgressViewIOS,
  Text,
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

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.props.expenses || []);

    return (
      <View style={ [styles.currentMonthExpensesContainer, this.props.isPreviousMonth ? {marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight} : {}] }>
        <View style={ styles.currentMonthExpensesHeader }>
          <Text style={ styles.headerText }>
            Your { dateMethods.getMonthString(this.props.month) + ' ' + this.props.year } budget:
          </Text>
          <Text style={ styles.subText }>
            { this.props.spent } of { this.props.budget } spent
          </Text>
          <ProgressViewIOS
            progress={ this._getProgressViewAmount() }
            progressTintColor={ '#A3E75A' }
            style={ styles.progressView }
          />
        </View>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={ (rowData, sectionID, rowID) => this._renderRowData(rowData, rowID) }
          renderSeparator={ (sectionID, rowID) => this._renderRowSeparator(sectionID, rowID) }
        />
      </View>
    )
  }

  _getProgressViewAmount () {
    return this.props.spent/this.props.budget;
  }

  _renderRowData (rowData, rowID) {
    if (rowData) {
      return (
        <ExpenseRow
          amount={ rowData.amount }
          category={ rowData.category }
          description={ rowData.description }
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
