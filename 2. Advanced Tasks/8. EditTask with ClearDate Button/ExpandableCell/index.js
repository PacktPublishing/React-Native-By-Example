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
    title: PropTypes.object.isRequired
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
            <View
              style={ styles.textRow }>
              <Text
                style={ styles.visibleContent } >
                { this._getTitle() }</Text>
              <Text
                style={ styles.secondaryDetails }>
                { this._getSubtitle() }</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={ [styles.collapsibleContent, { maxHeight: this.state.expanded ? this.props.childrenHeight : 0 }] } >
          { this.props.children }
        </View>
      </View>
    )
  }

  _getSubtitle () {
    if (this.props.dueDateAssigned || this.props.dateSelected) {
      return this.props.secondaryDetails
    }

    if (!this.props.dueDateAssigned && !this.props.dateSelected) {
      return 'None';
    }
  }

  _getTitle () {
    if (this.props.dueDateAssigned || this.props.dateSelected) {
      return this.props.title.assigned
    }

    if (!this.props.dueDateAssigned && !this.props.dateSelected) {
      return this.props.title.empty
    }
  }

  _onPress () {

    this.props.onPress();

    this.setState({
      expanded: !this.state.expanded
    });
  }

}

export default ExpandableCell;
