import React, { Component, PropTypes } from 'react';

import {
  LayoutAnimation,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles';

class ExpandableCell extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);

    this.state = {
      expanded: false
    }
  }

  componentWillUpdate () {
    LayoutAnimation.linear();
  }

  render () {
    return (
      <View
        style={ styles.container }>
        <View>
          <TouchableHighlight
            onPress={ () => this._onPress() }
            underlayColor={ '#D3D3D3' }>
          <Text
            style={ styles.visibleContent } >
            { this.props.title }</Text>
          </TouchableHighlight>
        </View>
        <View
          style={ [styles.collapsibleContent, { maxHeight: this.state.expanded ? this.props.childrenHeight : 0 }] } >
          { this.props.children }
        </View>
      </View>
    )
  }

  _onPress () {
    this.setState({
      expanded: !this.state.expanded
    });
  }

}

export default ExpandableCell;
