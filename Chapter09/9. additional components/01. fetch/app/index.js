import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';

import styles from './styles';

export default class App extends Component {

  constructor (props) {
    super (props);

    this.state = {
      data: []
    }
  }

  componentDidMount () {
    const endpoint = 'https://jsonplaceholder.typicode.com/users';
    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.setState({
          data: result
        });
      })
  }

  render () {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>
          Hello from React Native!
        </Text>
      </View>
    )
  }
}
