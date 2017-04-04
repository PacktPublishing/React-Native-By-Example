import React, { Component } from 'react';

import {
  ListView,
  Text,
  View
} from 'react-native';

import styles from './styles';
import * as dateMethods from '../../utils/dateMethods';
import * as storageMethods from '../../utils/storageMethods';

export default class PreviousMonthsList extends Component {
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

  async componentWillMount () {
    let result = await storageMethods.getAsyncStorage();

    this.setState({
      listOfExpenses: result
    });
  }

  render () {
    const dataSource = this.state.ds.cloneWithRowsAndSections(this.state.listOfExpenses);

    return (
      <View style={ styles.previousMonthsListContainer }>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          renderRow={ (rowData, sectionID, rowID) => this._renderRowData(rowData, rowID) }
          renderSectionHeader={ (sectionData, sectionID) => this._renderSectionHeader(sectionData, sectionID) }
          renderSeparator={ (sectionID, rowID) => this._renderRowSeparator(sectionID, rowID) }
        />
      </View>
    )
  }

  _renderRowData (rowData, rowID) {
    return (
      <View style={ styles.rowDataContainer }>
        <Text style={ styles.rowMonth }>
          { dateMethods.getMonthString(rowID) }
        </Text>
        <Text style={ styles.rowBudget }>
          { rowData.budget }
        </Text>
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

}