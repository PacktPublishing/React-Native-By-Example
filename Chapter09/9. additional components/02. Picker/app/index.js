import React, { Component } from 'react';

import {
  Picker,
  Text,
  View
} from 'react-native';

import styles from './styles';

export default class App extends Component {

  constructor (props) {
    super (props);

    this.state = {
      data: [],
      selectedValue: undefined
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
        <Text style={ styles.pickerSelectionText } >
          Your selected value is: { this.state.selectedValue }
        </Text>
        <Picker
          onValueChange={ (value, position) => this._onValueChange(value, position) }
          selectedValue={ this.state.selectedValue }
          style={ styles.picker }>
          { this.state.data.map((element, index) => {
            return (
              <Picker.Item key={ index } label={ element.name } value={ element.name } />
            )
          }) }
        </Picker>
      </View>
    )
  }

  _onValueChange (value, position) {
    this.setState({
      selectedValue: value
    });
  }
}
