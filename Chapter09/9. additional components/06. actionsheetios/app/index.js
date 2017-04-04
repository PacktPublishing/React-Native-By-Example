import React, { Component } from 'react';

import {
  ActionSheetIOS,
  Button,
  Linking,
  Picker,
  Platform,
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
        { this._renderActionAndShareSheets() }
      </View>
    )
  }

  _onActionSheetOptionSelected (index) {
    alert('The index you selected is: ' + index)
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

  _onBeginWatchPositionButtonPress () {
    const watchID = navigator.geolocation.watchPosition((watchSuccess) => {
      this.setState({
        location: watchSuccess
      })
    })

    this.setState({
      watchID: watchID
    })
  }

  _onCancelWatchPositionButtonPress () {
    navigator.geolocation.clearWatch(this.state.watchID);
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

  _openActionSheet () {
    const options = ['One', 'Two', 'Three', 'Cancel', 'Destroy'];
    ActionSheetIOS.showActionSheetWithOptions({
      options: options,
      cancelButtonIndex: 3,
      destructiveButtonIndex: 4,
      title: 'Action Sheet Options',
      message: 'Please select from the following options'
    }, (index) => this._onActionSheetOptionSelected(index))
  }

  _openShareSheet () {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'https://facebook.github.io/react-native',
      message: 'Check out the React Native documentation here, it\'s really helpful!',
      subject: 'Link to React Native docs'
    }, (error) => alert(error),
    (success) => {
      alert(success);
    })
  }

  _renderActionAndShareSheets () {
    if (Platform.OS === 'android') {
      return;
    }

    return (
      <View>
        <Button
          color={ '#365899' }
          onPress={ () => this._openActionSheet() }
          title={ 'Open Action Sheet' } />
        <Button
          color={ '#365899' }
          onPress={ () => this._openShareSheet() }
          title={ 'Open Share Sheet' } />
      </View>
    )
  }
}
