import React, { Component } from 'react';

import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import * as dateMethods from '../../utils/dateMethods';
import * as storageMethods from '../../utils/storageMethods';

import SelectedMonthList from '../SelectedMonthList';

class PreviousMonthsList extends Component {
  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      listOfExpenses: {}
    };

    this._renderRow = this._renderRow.bind(this);
    this._renderSelectedMonthList = this._renderSelectedMonthList.bind(this);
  }

  componentDidMount () {
    storageMethods.getAsyncStorage()
      .then((parsedResult) => {
        this.setState({
          listOfExpenses: parsedResult
        })
      });
  }

  render () {
    const dataSource = this.state.ds.cloneWithRowsAndSections(this.state.listOfExpenses);

    return (
      <View style={ styles.container }>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          renderRow={ this._renderRow }
          renderSectionHeader={ this._renderSectionHeader } />
      </View>
    )
  }

  _renderRow (rowData, sectionID, rowID) {
    return (
      <View style={ styles.row }>
        <TouchableHighlight
          style={ styles.button }
          onPress={ () => this._renderSelectedMonthList(rowData, sectionID, rowID) }>
          <View style={ styles.buttonContainer }>
            <Text style={ styles.rowMonth }>
              {dateMethods.getMonthString(rowID)}
            </Text>
            <Text style={ styles.rowBudget }>
              {rowData.budget}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _renderSectionHeader (sectionData, sectionID) {
    return (
      <View style={ styles.section }>
        <Text style={ styles.sectionText }>
          { sectionID }
        </Text>
      </View>
    )
  }

  _renderSelectedMonthList (rowData, sectionID, rowID) {
    this.props.navigator.push({
      component: SelectedMonthList,
      title: dateMethods.getMonthString(rowID) + ' ' + sectionID,
      passProps: {
        budgetSet: rowData.budget,
        list: rowData.expenses,
        month: rowID
      }
    })
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 30
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    marginTop: 10,
    height: 30
  },
  rowMonth: {
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
    textAlign: 'left'
  },
  rowBudget: {
    flex: 1,
    fontSize: 20,
    marginRight: 10,
    textAlign: 'right'
  },
  section: {
    height: 20,
    backgroundColor: '#C2CDD1',
  },
  sectionText: {
    marginLeft: 10
  },
});

export default PreviousMonthsList;