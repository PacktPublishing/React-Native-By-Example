import React, { Component } from 'react';

import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import * as storageMethods from '../../utils/storageMethods';
import * as iconMethods from '../../utils/iconMethods';

import SelectCategory from '../SelectCategory';

class AddExpenseModal extends Component {
  constructor (props) {
    super (props);

    this.state = {
      categorySelected: undefined
    }
  }

  render () {
    return (
      <Modal
        animationType={ 'slide' }
        transparent={ false }
        visible={ this.props.addExpenseModalVisible }
        onRequestClose={ this.props.dismissedAddExpenseModal }>
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
            style={ styles.selectCategoryButton }
            onPress={ () => console.log('okay') }>
            <View
              style={ styles.selectCategoryContainer }>
              <Text
                style={ styles.selectCategoryButtonText }>
                Select Category
              </Text>
              <Text
                style={ styles.selectCategoryIconText }>
                { this.state.categorySelected ? this.state.categoryIcon : 'V' }
              </Text>
            </View>
          </TouchableHighlight>
          <SelectCategory
            setCategory={ (data) => this._changeCategory(data) } />
          <TouchableHighlight
            style={ styles.saveButton }
            onPress={ () => this._saveExpense() }
            disabled={ (this.state.amount && this.state.description && this.state.categorySelected) ? false : true }>
            <Text
              style={ styles.saveButtonText }>
              Save Item
            </Text>
          </TouchableHighlight>
        </View>
      </Modal>
    )
  }

  _changeAmount (amount) {
    this.setState({
      amount: amount
    });
  }
  _changeCategory (categoryName) {
    const iconComponent = categoryName ? iconMethods.getIconComponent(categoryName) : undefined;

    this.setState({
      categorySelected: categoryName,
      categoryIcon: iconComponent
    });
  }

  _changeDescription (description) {
    this.setState({
      description: description
    });
  }

  _clearFieldsAndToggleModal () {
    this._changeAmount('');
    this._changeCategory(undefined);
    this._changeDescription('');
    this.props.toggleModal();
  }

  _saveExpense () {
    console.log(typeof this.state.amount);

    storageMethods.saveExpenseToMonth(this.props.month, this.props.year, {
      amount: this.state.amount,
      category: this.state.categorySelected,
      description: this.state.description
    }, () => {
      this.props.updateList();
      this._clearFieldsAndToggleModal();
    })
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
  saveButton: {
    height: 40,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: '#66FF66'
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 20
  },
  selectCategoryButton: {
    height: 40,
    marginTop: 10,
    borderBottomColor: '#000000',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#000000',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  selectCategoryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectCategoryButtonText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 20,
  },
  selectCategoryIconText: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    fontSize: 20
  }
})

export default AddExpenseModal;