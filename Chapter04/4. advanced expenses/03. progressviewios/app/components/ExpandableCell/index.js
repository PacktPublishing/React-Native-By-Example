import React, { Component, PropTypes } from 'react';

import {
  LayoutAnimation,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles';

export default class ExpandableCell extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  constructor (props) {
    super (props);
  }

  componentWillUpdate () {
    LayoutAnimation.linear();
  }

  render () {
    return (
      <View style={ styles.expandableCellContainer }>
        <View>
          <TouchableHighlight
            onPress={ () => this.props.onPress() }
            underlayColor={ '#D3D3D3' }
          >
            <Text style={ styles.visibleContent }>{ this.props.title}</Text>
          </TouchableHighlight>
        </View>
        <View style={ [styles.hiddenContent, this.props.expanded ? {} : {maxHeight: 0}]}>
          { this.props.children }
        </View>
      </View>
    )
  }
}
