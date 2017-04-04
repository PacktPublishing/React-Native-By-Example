import React, { Component, PropTypes } from 'react';

import {
  Button,
  DatePickerAndroid,
  Modal,
  Picker,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

import moment from 'moment';
import styles from './styles';

import * as iconMethods from '../../utils/iconMethods';
import * as storageMethods from '../../utils/storageMethods';

export default class AddExpensesModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    month: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    year: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);

    this.state = {
      amount: '',
      category: undefined,
      date: new Date(),
      description: '',
    }
  }

  render () {
    const datePickerButtonTitle = 'Date: ' + moment(this.state.date).format('ll') + ' (tap to change)';
    const categoryPickerButtonTitle = 'Category: ' + (this.state.category ? iconMethods.categories[this.state.category].name : 'None (tap to change)')

    return (
      <Modal
        animationType={ 'slide' }
        onRequestClose={ () => this._clearFieldsAndCloseModal() }
        transparent={ false }
        visible={ this.props.modalVisible }
      >
        <ScrollView style={ styles.modalContainer }>
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
              style={ styles.androidAmountInput }
              value={ this.state.amount }
            />
          </View>
          <Text style={ styles.descriptionText }>
            Description
          </Text>
          <TextInput
            onChangeText={ (value) => this._changeDescription(value) }
            placeholder={ 'Book on React Native development' }
            style={ styles.androidDescriptionInput }
            value={ this.state.description }
          />
          <View style={ styles.androidPickerContainers }>
            <Button
              color={ '#86B2CA' }
              onPress={ () => this._renderDatePicker() }
              title={ datePickerButtonTitle }
            />
          </View>
          <View style={ styles.androidPickerContainers }>
            <View style={ styles.categoryIcon }>
              { this.state.category && iconMethods.getIconComponent(this.state.category) }
            </View>
              <Picker
                onValueChange={ (value, index) => this._setItemCategory(value) }
                prompt={ categoryPickerButtonTitle }
                selectedValue={ this.state.category }
              >
              { this._renderCategoryPicker() }
            </Picker>
          </View>
          <Button
            color={ '#86B2CA' }
            disabled={ !(this.state.amount && this.state.description && this.state.category) }
            onPress={ () => this._saveItemToBudget() }
            title={ 'Save Expense' }
          />
          <Button
            color={ '#E85C58' }
            onPress={ () => this._clearFieldsAndCloseModal() }
            title={ 'Cancel' }
          />
        </ScrollView>
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

  _clearFieldsAndCloseModal () {
    this.setState({
      amount: '',
      category: undefined,
      categoryPickerExpanded: false,
      date: new Date(),
      datePickerExpanded: false,
      description: ''
    });

    this.props.toggleModal()
  }

  _getDatePickerHeight (event) {
    this.setState({
      datePickerHeight: event.nativeEvent.layout.width
    });
  }

  _onDateChange () {
    const date = new Date(this.state.year, this.state.month, this.state.day);

    this.setState({
      date
    });
  }

  _renderCategoryPicker () {
    var categoryNames = Object.keys(iconMethods.categories);

    return categoryNames.map((elem, index) => {
      return (
        <Picker.Item
          key={ index }
          label={ iconMethods.categories[elem].name }
          value={ elem }
        />
      )
    })
  }

  async _renderDatePicker () {
    const options = {
      date: this.state.date
    };

    const { action, year, month, day } = await DatePickerAndroid.open(options);

    if (action === DatePickerAndroid.dismissedAction) {
      return;
    }

    this.setState({
      day,
      month,
      year
    });

    this._onDateChange();
  }

  _setItemCategory (category) {
    this.setState({
      category
    });
  }

  async _saveItemToBudget () {
    const expenseObject = {
      amount: this.state.amount,
      category: this.state.category,
      date: moment(this.state.date).format('ll'),
      description: this.state.description
    };

    let month = this.state.date.getMonth() + 1;
    let year = this.state.date.getFullYear();

    await storageMethods.saveItemToBudget(month, year, expenseObject);

    let test = await storageMethods.getAsyncStorage();

    this._clearFieldsAndCloseModal();
  }
}
