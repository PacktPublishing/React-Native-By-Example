import React, { Component } from 'react';

import {
  ListView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import DrawerRow from '../DrawerRow';
import styles from './styles';

export default class Drawer extends Component {
  constructor (props) {
    super (props);
    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.props.routes || []);

    return (
      <View style={ styles.container }>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={ (rowData, sectionID, rowID) => this._renderDrawerRow(rowData, sectionID, rowID) }
          renderSeparator={ (sectionID, rowID) =>
            <View
              key={ rowID }
              style={ styles.separator } />
          } />
      </View>
    )
  }

  _renderDrawerRow (rowData, sectionID, rowID) {
    return (
      <View>
        <TouchableHighlight
          style={ styles.row }
          onPress={ () => this.props.navigateTo(rowData.index) }>
          <DrawerRow
            routeName={ rowData.title } />
          </TouchableHighlight>
      </View>
    )
  }
}
