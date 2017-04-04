import React, { Component } from 'react';
import {
  ActivityIndicator,
  NavigatorIOS,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import {
  AccessToken,
} from 'react-native-fbsdk';

import Icon from 'react-native-vector-icons/FontAwesome';

import { getFeed } from './utils/graphMethods';
import { getAsyncStorage, setAsyncStorage } from './utils/storageMethods';
import FeedList from './components/FeedList';
import LoginPage from './components/LoginPage';

import styles from './styles';

export default class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      activityIndicatorSpinning: true,
      feed: undefined,
      refreshControlSpinning: false,
      selectedTab: 'feed'
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
          getFeed: () => this._getFeed()
        }
      });

      return;
    }

    const feed = await getAsyncStorage('feed');

    if (feed && feed.length > 0) {
      this.setState({
        feed,
        activityIndicatorSpinning: false
      });
      return;
    }

    this._getFeed();
  }

  _getFeed () {
    getFeed((error, result) => this._responseInfoCallback(error, result));
  }

  _renderFeedList () {
    return (
      <FeedList
        feed={ this.state.feed }
        navigator={ this.props.navigator }
        refreshControlSpinning={ this.state.refreshControlSpinning }
        refreshFeedList={ () => this._refreshFeedList() }
      />
    )
  }

  _renderLoginPrompt () {
    return (
      <LoginPage checkLoginStatus={ () => this._checkLoginStatus() } />
    )
  }

  _renderView () {
    if (this.state.activityIndicatorSpinning) {
      return (
        <ActivityIndicator
          animating={ this.state.activityIndicatorSpinning }
          size={ 'large' }
        />
      );
    }

    return (
      <View style={ styles.container }>
        <TabBarIOS>
          <Icon.TabBarItemIOS
            title={ 'Feed' }
            selected={ this.state.selectedTab === 'feed' }
            iconName={ 'newspaper-o' }
            iconSize={ 20 }
            onPress={ () => this._setSelectedTab('feed') }
          >
            { this._renderFeedList() }
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            title={ 'Sign Out' }
            selected={ this.state.selectedTab === 'signOut' }
            iconName={ 'sign-out' }
            iconSize={ 20 }
            onPress={ () => this._setSelectedTab('signOut') }
          >
            { this._renderLoginPrompt() }
          </Icon.TabBarItemIOS>
        </TabBarIOS>
      </View>
    )
  }

  _refreshFeedList () {
    this.setState({
      refreshControlSpinning: true
    });

    this._getFeed();
  }

  _responseInfoCallback (error, result) {
    if (error) {
      console.log('Error fetching data: ', error.toString());
      return;
    }

    setAsyncStorage('feed', result.data);
    this.setState({
      activityIndicatorSpinning: false,
      feed: result.data,
      refreshControlSpinning: false
    });
  }

  _setSelectedTab (selectedTab) {
    this.setState({
      selectedTab
    });
  }
}
