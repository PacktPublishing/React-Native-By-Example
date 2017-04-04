import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import {
  AccessToken,
} from 'react-native-fbsdk';

import { getFeed } from './utils/graphMethods';
import LoginPage from './components/LoginPage';

import styles from './styles';

export default class App extends Component {
  componentWillMount () {
    this._checkLoginStatus();
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Logged In</Text>
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

    getFeed((error, result) => this._responseInfoCallback(error, result));
  }

  _responseInfoCallback (error, result) {
    if (error) {
      console.log('Error fetching data: ', error.toString());
      return;
    }

    console.log(result);
  }
}

