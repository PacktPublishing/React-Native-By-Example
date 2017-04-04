import React, { Component } from 'react';
import {
  AppRegistry,
  DrawerLayoutAndroid,
  Navigator,
  StyleSheet,
  View
} from 'react-native';

import App from './app/App';
import Drawer from './app/components/Drawer';
import LoginPage from './app/components/LoginPage';
import PostView from './app/components/PostView';
import WebViewComponent from './app/components/WebViewComponent';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Friends extends Component {
  constructor (props) {
    super (props);
    this.state = {
      visibleRoutes: [
        { title: 'My Feed', index: 0 },
        { title: 'Log Out ', index: 1 }
      ]
    }
  }

  render() {
    const routes = [
      { title: 'My Feed', index: 0 },
      { title: 'Sign In/Log Out', index: 1 },
      { title: 'Post Details', index: 2 },
      { title: 'Web View', index: 3 }
    ];

    return (
      <View style={styles.container}>
        <DrawerLayoutAndroid
          drawerLockMode={ 'unlocked' }
          ref={ 'drawer' }
          renderNavigationView={ () => this._renderDrawerLayout() }
        >
          <Icon.ToolbarAndroid
            title="Friends"
            titleColor="#fafafa"
            navIconName="menu"
            height={ 56 }
            backgroundColor="#365899"
            onIconClicked={ () => this._openDrawer() }
          />
          <Navigator
            initialRoute={{ index: 0 }}
            ref={ 'navigator' }
            renderScene={ (routes, navigator) => this._renderScene(routes, navigator) }
          />
        </DrawerLayoutAndroid>
      </View>
    );
  }

  _openDrawer () {
    this.refs['drawer'].openDrawer();
  }

  _navigateTo (index) {
    this.refs['navigator'].push({
      index,
      passProps: {
        checkLoginStatus: () => this._checkLoginStatus()
      }
    });
    this.refs['drawer'].closeDrawer();
  }

  _renderDrawerLayout () {
    return (
      <Drawer
        navigateTo={ (index) => this._navigateTo(index) }
        routes={ this.state.visibleRoutes }
      />
    );
  }

  _renderScene (route, navigator) {
    if (route.index === 0) {
      return (
        <App
          title={ route.title }
          navigator={ navigator }
        />
      );
    }

    if (route.index === 1) {
      return (
        <LoginPage
          title={ route.title }
          navigator={ navigator }
          { ...route.passProps }
        />
      );
    }

    if (route.index === 2) {
      return (
        <PostView
          title={ route.title }
          navigator={ navigator }
          { ...route.passProps }
        />
      );
    }

    if (route.index === 3) {
      return (
        <WebViewComponent
          title={ route.title }
          navigator={ route.navigator }
          { ...route.passProps }
        />
      );
    }
  }

  _checkLoginStatus () {
    this._navigateTo(0);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Friends', () => Friends);
