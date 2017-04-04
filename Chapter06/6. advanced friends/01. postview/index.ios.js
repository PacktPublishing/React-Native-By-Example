import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native';

import App from './app/App';

export default class Friends extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: App,
          title: 'Friends'
        }}
        style={ styles.container }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Friends', () => Friends);
