import React, { Component } from 'react';

import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as dateMethods from '../../utils/dateMethods';
import * as storageMethods from '../../utils/storageMethods';

import ExpenseRow from '../ExpenseRow';

class CurrentMonthList extends Component {
  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      remainingBudget: 0,
      totalSpent: 0
    }
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.props.list || []);
    const dynamicMonth = dateMethods.getMonthString(this.props.month);

    return (
      <View style={ styles.container }>
        <View style={ styles.row }>
          <Text style={ styles.remainingBudget }>
            Your { dynamicMonth } budget: ${ this.props.budgetSet }
          </Text>
        </View>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={ (rowData, sectionID, rowID) =>
            <ExpenseRow
              amount={ rowData.amount }
              category={ rowData.category }
              description={ rowData.description }
              key={ rowID }/>
          }
          renderSeparator={ (sectionID, rowID) =>
            <View
              key={ rowID }
              style={ styles.separator } />
          } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  row: {
    backgroundColor: '#C2CDD1',
    height: 40
  },
  remainingBudget: {
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center'
  },
  dollarAmount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#66FF66'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#000000'
  }
})
export default CurrentMonthList;
