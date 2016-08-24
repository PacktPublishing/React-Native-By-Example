import React, { Component, PropTypes } from 'react';

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class SampleComponent extends Component {
  static propTypes = {
    collapsedComponent: PropTypes.any.isRequired,
    order: PropTypes.number,
    title: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);

    this.state = {
      expanded: false
    }
  }

  render () {
    return (
      <View>
        <Text>Expandable Cell: { this.props.title }</Text>
      </View>
    )
  }
}

export default SampleComponent;
