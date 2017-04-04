import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton
} from 'react-native-fbsdk';

export default class Friends extends Component {
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
                  const data = await AccessToken.getCurrentAccessToken()
                  alert(data);
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}
        />
      </View>
    );
  }

  _getFeed () {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Friends', () => Friends);
