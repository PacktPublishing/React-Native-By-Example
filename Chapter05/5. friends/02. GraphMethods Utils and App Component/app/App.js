import React, { Component } from 'react';
import {
  View
} from 'react-native';

import {
  AccessToken,
  LoginButton
} from 'react-native-fbsdk';

import { getFeed } from './utils/graphMethods';

import styles from './styles';

export default class App extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <LoginButton
        readPermissions={["public_profile", "user_photos", "user_posts", "user_events", "user_likes"]}
          onLoginFinished={
            async (error, result) => {
              if (error) {
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                  await AccessToken.getCurrentAccessToken();
                  getFeed((error, result) => this._responseInfoCallback(error, result))
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}
        />
      </View>
    );
  }

  _responseInfoCallback (error, result) {
    if (error) {
      console.log('Error fetching data: ', error.toString());
      return;
    }

    console.log(result);
  }
}

