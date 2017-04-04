import React, { Component } from 'react';
import {
  ListView,
  Platform,
  RefreshControl,
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
      <View style={ Platform.OS === 'ios' ? styles.container : styles.androidContainer }>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          refreshControl={ this._renderRefreshControl() }
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

  _renderRefreshControl () {
    return (
      <RefreshControl
        onRefresh={ () => this.props.refreshFeedList() }
        refreshing={ this.props.refreshControlSpinning }
        tintColor={ '#365899' }
        title={ 'Refresh Feed' }
        titleColor={ '#365899' }
      />
    )
  }
}
