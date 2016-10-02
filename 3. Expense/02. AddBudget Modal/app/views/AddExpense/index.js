import React, { Component } from 'react';

import {
  DatePickerIOS,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import * as dateMethods from '../../utils/dateMethods';
import * as storageMethods from '../../utils/storageMethods';

class AddExpense extends Component {
  constructor (props) {
    super (props);

    this.state = {
      modalVisible: false
    }
  }

  render () {
    return (
      <View
        style={ styles.container }>
        <Modal
          animationType={ 'slide' }
          transparent={ false }
          visible={ this.state.modalVisible }
          onRequestClose={ this.props.dismissedModal }>
          <View
            style={ styles.modalContainer }>
            <View
              style={ styles.amountRow }>
              <Text
                style={ styles.amountText }>
                Amount
              </Text>
              <TextInput
                style={ styles.amountInput }
                onChangeText={ (amount) => this._changeAmount(amount) }
                keyboardType={ 'numeric' }
                value={ this.state.amount }/>
            </View>
            <Text
              style={ styles.text }>
              Description
            </Text>
            <TextInput
              style={ styles.textInput }
              onChangeText={ (description) => this._changeDescription(description) }
              keyboardType={ 'default' }
              value={ this.state.description }/>
            <TouchableHighlight
              style={ styles.saveButton }
              onPress={ () => this._saveExpense() }
              disabled={ (this.state.amount && this.state.description) ? false : true }>
              <Text
                style={ styles.buttonText }>
                Save Item
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <TouchableHighlight
          style={ styles.addButton }
          onPress={ () => this._toggleModal() }>
          <Text
            style={ styles.buttonText }>
            Add Expense
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  _changeAmount (amount) {
    this.setState({
      amount: amount
    });
  }

  _changeDescription (description) {
    this.setState({
      description: description
    });
  }

  _clearFieldsAndToggleModal () {
    this._changeAmount('');
    this._changeDescription('');
    this._toggleModal();
  }

  _saveExpense () {
    storageMethods.saveExpenseToMonth(this.props.month, this.props.year, {
      amount: this.state.amount,
      description: this.state.description
    }, () => {
      this.props.updateList();
      this._clearFieldsAndToggleModal();
    })
  }

  _toggleModal () {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 75
  },
  text: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 20,
    marginBottom: 5
  },
  amountText: {
    margin: 10,
    marginLeft: 20,
    paddingTop: 10
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  amountInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    height: 40,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: '#00AAFF'
  },
  saveButton: {
    height: 40,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: '#66FF66'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20
  }
})

export default AddExpense;
