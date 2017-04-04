import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View
} from 'react-native';

import {
  AccessToken,
} from 'react-native-fbsdk';

import { getFeed } from './utils/graphMethods';
import { getAsyncStorage, setAsyncStorage } from './utils/storageMethods';
import FeedList from './components/FeedList';
import LoginPage from './components/LoginPage';

import styles from './styles';

export default class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      feed: undefined,
      spinning: true
    }
  }

  componentWillMount () {
    this._checkLoginStatus();
  }

  render() {
    return (
      <View style={ styles.container }>
        { this._renderView() }
      </View>
    );
  }

  async _checkLoginStatus () {
    const result = await AccessToken.getCurrentAccessToken();

    if (result === null) {
      this.props.navigator.push({
        component: LoginPage,
        title: 'Log In to Facebook',
        navigationBarHidden: true,
        passProps: {
          getFeed: () => getFeed()
        }
      });

      return;
    }

    const feed = await getAsyncStorage('feed');

    if (feed && feed.length > 0) {
      this.setState({
        feed,
        spinning: false
      });
      return;
    }

    getFeed((error, result) => this._responseInfoCallback(error, result));
  }

  _renderView () {
    if (this.state.spinning) {
      return (
        <ActivityIndicator
          animating={ this.state.spinning }
          size={ 'large' }
        />
      );
    }

    return (
      <FeedList
        feed={ this.state.feed }
        navigator={ this.props.navigator }
      />
    );
  }

  _responseInfoCallback (error, result) {
    if (error) {
      console.log('Error fetching data: ', error.toString());
      return;
    }

    setAsyncStorage('feed', result.data);
    this.setState({
      feed: result.data,
      spinning: false
    });
  }
}
