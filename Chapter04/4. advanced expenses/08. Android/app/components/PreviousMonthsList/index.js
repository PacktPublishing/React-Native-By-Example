import React, { Component, PropTypes } from 'react';

import {
  ListView,
  Platform,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles';
import CurrentMonthExpenses from '../CurrentMonthExpenses';
import * as dateMethods from '../../utils/dateMethods';
import * as storageMethods from '../../utils/storageMethods';

export default class PreviousMonthsList extends Component {
  static propTypes = {
    expenses: PropTypes.object.isRequired,
    updateExpenses: PropTypes.func.isRequired
  }

  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      listOfExpenses: {}
    };
  }

  render () {
    const dataSource = this.state.ds.cloneWithRowsAndSections(this.props.expenses);

    return (
      <View style={ Platform.OS === 'ios' ? styles.previousMonthsListContainer : {} }>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          renderRow={ (rowData, sectionID, rowID) => this._renderRowData(rowData, sectionID, rowID) }
          renderSectionHeader={ (sectionData, sectionID) => this._renderSectionHeader(sectionData, sectionID) }
          renderSeparator={ (sectionID, rowID) => this._renderRowSeparator(sectionID, rowID) }
        />
      </View>
    )
  }

  _renderRowData (rowData, sectionID, rowID) {
    return (
      <View style={ styles.rowDataContainer }>
        <TouchableHighlight
          onPress={ () => this._renderSelectedMonth(rowData, sectionID, rowID) }
          style={ styles.rowDataTouchableContainer }>
          <View style={ styles.textRow }>
            <Text style={ styles.rowMonth }>
              { dateMethods.getMonthString(rowID) }
            </Text>
            <Text style={ styles.rowBudget }>
              { rowData.budget }
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _renderRowSeparator (sectionID, rowID) {
    return (
      <View
        key={ sectionID + rowID }
        style={ styles.rowSeparator }
      />
    )
  }

  _renderSectionHeader (sectionData, sectionID) {
    return (
      <View style={ styles.sectionHeader }>
        <Text style={ styles.sectionText }>
          { sectionID }
        </Text>
      </View>
    )
  }

  _renderSelectedMonth (rowData, sectionID, rowID) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        component: CurrentMonthExpenses,
        title: dateMethods.getMonthString(rowID) + ' ' + sectionID,
        passProps: {
          budget: rowData.budget.toString(),
          expenses: rowData.expenses,
          isPreviousMonth: true,
          month: rowID,
          spent: rowData.spent,
          updateExpenses: () => this.props.updateExpenses(),
          year: sectionID
        }
      });
    }

    if (Platform.OS === 'android') {
      this.props.navigator.push({
        index: 3,
        passProps: {
          budget: rowData.budget.toString(),
          expenses: rowData.expenses,
          isPreviousMonth: true,
          month: rowID,
          spent: rowData.spent,
          updateExpenses: () => this.props.updateExpenses(),
          year: sectionID
        }
      });
    }
  }
}