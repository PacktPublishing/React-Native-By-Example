import React, { Component, PropTypes } from 'react';

import {
  Modal,
  Text,
  TextInput,
  View
} from 'react-native';

import styles from './styles';

export default class AddExpensesModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);

    this.state = {
      amount: '',
      description: '',
    }
  }

  render () {
    return (
      <Modal
        animationType={ 'slide' }
        transparent={ false }
        visible={ this.props.modalVisible }
      >
        <View style={ styles.modalContainer }>
          <Text style={ styles.headerText }>
            Add an Expense
          </Text>
          <View style={ styles.amountRow }>
            <Text style={ styles.amountText }>
              Amount
            </Text>
            <TextInput
              keyboardType={ 'numeric' }
              onChangeText={ (value) => this._changeAmount(value) }
              placeholder={ '0' }
              style={ styles.amountInput }
              value={ this.state.amount }
            />
          </View>
          <Text style={ styles.descriptionText }>
            Description
          </Text>
          <TextInput
            onChangeText={ (value) => this._changeDescription(value) }
            placeholder={ 'Book on React Native development' }
            style={ styles.descriptionInput }
            value={ this.state.description }
          />
        </View>
      </Modal>
    )
  }

  _changeAmount(amount) {
    this.setState({
      amount
    });
  }

  _changeDescription(description) {
    this.setState({
      description
    });
  }
}
