import React, { Component } from 'react';
import {
  ActivityIndicator,
  BackAndroid,
  Button,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { getAsyncStorage, setAsyncStorage } from '../../utils/storageMethods';
import { getDateTimeString } from '../../utils/dateMethods';
import { getHeightRatio, getWidthOffset } from '../../utils/imageMethods';
import { getPostDetails } from '../../utils/graphMethods';
import CommentList from '../CommentList';
import WebViewComponent from '../WebViewComponent';
import styles from './styles';

export default class PostView extends Component {
  constructor (props) {
    super (props);

    this.state = {
      loading: true
    }
  }

  async componentWillMount () {
    BackAndroid.addEventListener('hardwareButtonPress', () => this._backButtonPress());

    const result = await getAsyncStorage(this.props.postID);

    if (Object.keys(result).length === 0) {
      this._getPostDetails();
      return;
    }
    this._savePostDetailsToState(result);
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareButtonPress', () => this._backButtonPress())
  }

  render () {
    return (
      <ScrollView style={ styles.container }>
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
          { !this.state.loading && this._renderAttachments() }
        </View>
        <View>
          { !this.state.loading && this._renderLink() }
        </View>
        <View>
          { this.state.loading ? this._renderActivityIndicator() : this._renderDetails() }
        </View>
        <View style={ styles.separator } />
        <View style={ styles.commentListContainer }>
          <CommentList comments={ this.state.comments } />
        </View>
      </ScrollView>
    )
  }

  _backButtonPress () {
    this.props.navigator.pop();
    return true;
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

  _renderAttachments () {
    let attachment = this.state.attachments[0]
    let media;

    if (attachment && attachment.hasOwnProperty('subattachments')) {
      attachment = attachment.subattachments.data[0];
    }

    if (attachment && attachment.hasOwnProperty('media')) {
      media = attachment.media;
    }

    if (media) {
      const imageObject = media.image;

      return (
        <Image
          resizeMode={ 'contain' }
          source={{ uri: imageObject.src }}
          style={{
            marginRight: 10,
            marginTop: 30,
            width: getWidthOffset(),
            height: getHeightRatio(imageObject.height, imageObject.width)
          }}
        />
      )
    }
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

  _renderLink () {
    let attachment = this.state.attachments[0];
    let link;
    let title;

    if (attachment && attachment.hasOwnProperty('subattachments')) {
      attachment = attachment.subattachments.data[0];
    }

    if (attachment && attachment.hasOwnProperty('url')) {
      link = attachment.url;
      title = attachment.title || 'Link';

      return (
        <Button
          color={ '#365899' }
          onPress={ () => this._renderWebView(link) }
          title={ title }
        />
      )
    }
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

  _renderWebView (url) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        component: WebViewComponent,
        passProps: {
          url
        }
      });
      return;
    }

    this.props.navigator.push({
      index: 3,
      passProps: {
        url
      }
    });
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

