import React, { Component } from 'react';
import {
  ListView,
  View
} from 'react-native';

import FeedListRow from '../FeedListRow';

import styles from './styles';

export default class FeedList extends Component {
  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.props.feed || []);

    return (
      <View style={ styles.container }>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          renderRow={ (rowData, sectionID, rowID) =>
            <FeedListRow
              createdTime={ rowData.created_time }
              message={ rowData.message }
              navigator={ this.props.navigator }
              postID={ rowData.id }
              story={ rowData.story }
            />
          }
          renderSeparator={ (sectionID, rowID) =>
            <View
              key={ rowID }
              style={ styles.separator }
            />
          }
        />
      </View>
    )
  }
}
