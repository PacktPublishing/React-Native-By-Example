import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { getAsyncStorage, setAsyncStorage } from '../../utils/storageMethods';
import { getDateTimeString } from '../../utils/dateMethods';
import { getPostDetails } from '../../utils/graphMethods';
import CommentList from '../CommentList';
import styles from './styles';

export default class PostView extends Component {
  constructor (props) {
    super (props);

    this.state = {
      loading: true
    }
  }

  async componentWillMount () {
    const result = await getAsyncStorage(this.props.postID);

    if (Object.keys(result).length === 0) {
      this._getPostDetails();
      return;
    }
    this._savePostDetailsToState(result);
  }

  render () {
    return (
      <View style={ styles.container }>
        <View>
          <Text style={ styles.created }>
            { this._renderCreatedString() }
          </Text>
            { this._renderStoryString() }
          <Text>
            { this._renderMessageString() }
          </Text>
        </View>
        <View>
          { this.state.loading ? this._renderActivityIndicator() : this._renderDetails() }
        </View>
        <View style={ styles.separator } />
        <View style={ styles.commentListContainer }>
          <CommentList comments={ this.state.comments } />
        </View>
      </View>
    )
  }

  async _getPostDetails () {
    await getPostDetails(this.props.postID, (result) => {
      this._savePostDetailsToState(result);
      setAsyncStorage(this.props.postID, result);
    });
  }

  _renderActivityIndicator () {
    return (
      <ActivityIndicator
        animating={ this.state.spinning }
        size={ 'large' }
      />
    )
  }

  _renderCreatedString () {
    return 'Posted ' + getDateTimeString(this.props.createdTime);
  }

  _renderDetails () {
    return (
      <View style={ styles.detailsContainer }>
        <Text style={ styles.detailsRow }>
          { this.state.likes.length } Likes, { this.state.comments.length } Comments
        </Text>
      </View>
    )
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

  _savePostDetailsToState (data) {
    this.setState({
      attachments: data.attachments,
      comments: data.comments,
      likes: data.likes,
      loading: false
    });
  }
}

