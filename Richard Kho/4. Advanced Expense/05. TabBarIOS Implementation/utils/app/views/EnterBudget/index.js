import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import * as storageMethods from '../../utils/storageMethods';
import * as dateMethods from '../../utils/dateMethods';

class EnterBudget extends Component {

  constructor (props) {
    super (props);

    this.state = {
      value: undefined
    }
  }

  render () {
    const dynamicMonth = dateMethods.getMonthString(this.props.month);

    return (
      <View style={ styles.container }>
        <Text style={ styles.containerHeader }>
          Enter Your { dynamicMonth } Budget
        </Text>
        <Text style={ styles.containerText }>
          What's your spending goal?
        </Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={ (value) => this._setValue(value) }
          value={ this.state.value }
          placeholder={ '0' }
          keyboardType={ 'numeric' } />
        <TouchableHighlight
          style={ styles.button }
          onPress={ () => this._saveBudget() }
          disabled={ this.state.value ? false : true }>
          <Text style={ styles.buttonText }>
            Save Budget
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  _setValue (value) {
    this.setState({
      value: value,
      intValue: parseInt(value)
    });
  }

  _saveBudget () {
    storageMethods.saveMonthlyBudget(this.props.month, this.props.year, this.state.intValue)
    this.props.saveBudget(this.state.intValue);
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 75
  },
  textInput: {
    height: 40,
    borderColor: '#66FF66',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    textAlign: 'center'
  },
  containerHeader: {
    fontSize: 24,
    margin: 10,
    textAlign: 'center'
  },
  containerText: {
    fontSize: 16,
    margin: 10,
    textAlign: 'center'
  },
  button: {
    height: 40,
    backgroundColor: '#66FF66',
    borderRadius: 10,
    margin: 10,
    padding: 10
  },
  buttonText: {
    textAlign: 'center'
  }
})

export default EnterBudget;