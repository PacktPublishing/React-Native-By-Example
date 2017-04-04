import React, { Component } from 'react';

import {
  Button,
  Linking,
  Picker,
  Slider,
  Text,
  Vibration,
  View
} from 'react-native';

import styles from './styles';

export default class App extends Component {

  constructor (props) {
    super (props);

    this.state = {
      data: [],
      selectedValue: undefined,
      sliderValue: undefined
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
        this._onDataAvailable();
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
        <Button
          color={ '#365899' }
          onPress={ () => this._onButtonPress() }
          title={ 'Open in Chrome ' } />
        <Text style={ styles.sliderSelectionText } >
          Your Slider Value is: { this.state.sliderValue }
        </Text>
        <Slider
          maximumValue={ 100 }
          minimumValue={ 0 }
          onSlidingComplete={ (value) => this._onSliderValueChange(value) }
          onValueChange={ (value) => this._onSliderValueChange(value) }
          step={ 3 } />
      </View>
    )
  }

  _onButtonPress () {
    const facebookURL = 'fb://notifications';

    Linking.canOpenURL(facebookURL)
      .then((isAvailable) => {
        if (isAvailable) {
          Linking.openURL(facebookURL)
        }

        if (!isAvailable) {
          Linking.openURL('https://facebook.github.io/react-native');
        }
      })
  }

  _onDataAvailable () {
    Vibration.vibrate([1000, 2000, 1000, 2000], false);
  }

  _onSliderValueChange (value) {
    this.setState({
      sliderValue: value
    });
  }

  _onValueChange (value, position) {
    this.setState({
      selectedValue: value
    });
  }
}
