import React, { Component } from 'react';
import {
  ListView,
  Text,
  View
} from 'react-native';

import CommentListRow from '../CommentListRow';
import styles from './styles';

export default class CommentList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.props.comments || []);

    return (
      <View style={ styles.contaienr }>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          renderRow={ (rowData, sectionID, rowID) =>
            <CommentListRow
              message={ rowData.message }
              name={ rowData.from.name } />
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