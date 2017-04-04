import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';

import styles from './styles';

export default class DrawerRow extends Component {
  setNativeProps (props) {
    this._root.setNativeProps(props)
  }

  render () {
    return (
      <View
        style={ styles.container }
        ref={ component => this._root = component }
        { ...this.props }>
        <Text style={ styles.rowTitle }>
          { this.props.routeName }
        </Text>
      </View>
    )
  }
}
