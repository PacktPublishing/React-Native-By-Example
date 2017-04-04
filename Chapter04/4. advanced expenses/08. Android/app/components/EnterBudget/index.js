import React, { Component, PropTypes } from 'react';

import {
  Platform,
  Text,
  TextInput,
  Button,
  View
} from 'react-native';

import styles from './styles';

import * as dateMethods from '../../utils/dateMethods';

export default class EnterBudget extends Component {
  static propTypes = {
    monthString: PropTypes.string.isRequired,
    saveAndUpdateBudget: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      budget: undefined
    }
  }

  render () {
    let month = dateMethods.getMonthString(dateMethods.getMonth());

    return (
      <View style={ styles.enterBudgetContainer }>
        <Text style={ styles.enterBudgetHeader }>
          Enter Your { this.props.monthString } Budget
        </Text>
        <Text style={ styles.enterBudgetText }>
          What's your spending goal?
        </Text>
        <TextInput
          style={ Platform.OS === 'ios' ? styles.textInput : styles.androidTextInput }
          onChangeText={ (budget) => this._setBudgetValue(budget) }
          value={ this.state.budget }
          placeholder={ '0' }
          keyboardType={ 'numeric' }
        />
        <View>
          <Button
            color={ '#3D4A53' }
            disabled={ !this.state.budget }
            onPress={ () => this._saveAndUpdateBudget() }
            title={ 'Save Budget' }
          />
        </View>
      </View>
    )
  }

  _saveAndUpdateBudget () {
    this.props.saveAndUpdateBudget(this.state.budget);
    this.props.navigator.pop();
  }

  _setBudgetValue (budget) {
    this.setState({
      budget
    });
  }
}