import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { getDateTimeString } from '../../utils/dateMethods';

import styles from './styles';

export default class FeedListRow extends Component {
  render () {
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          onPress={ () => this._navigateToPostView() }
          underlayColor={ '#D3D3D3' }
        >
          <View>
            <Text style={ styles.created }>
              { this._renderCreatedString() }
            </Text>
              { this._renderStoryString() }
            <Text style={ styles.message }>
              { this._renderMessageString() }
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _navigateToPostView () {
    console.log('pushed');
  }

  _renderCreatedString () {
    return 'Posted ' + getDateTimeString(this.props.createdTime);
  }

  _renderMessageString () {
    return this.props.message
  }

  _renderStoryString () {
    if (this.props.story) {
      return (
        <Text style={ styles.story }>
          { this.props.story }
        </Text>
      )
    }
  }
}