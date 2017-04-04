import React, { Component, PropTypes } from 'react';

import {
  Button,
  DatePickerIOS,
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
import ExpandableCell from '../ExpandableCell';

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
      categoryPickerExpanded: false,
      date: new Date(),
      description: '',
      datePickerExpanded: false
    }
  }

  render () {
    const expandableCellDatePickerTitle = 'Date: ' + moment(this.state.date).format('ll') + ' (tap to change)';
    const expandableCellCategoryPickerTitle = 'Category: ' + (this.state.category ? iconMethods.categories[this.state.category].name : 'None (tap to change)')

    return (
      <Modal
        animationType={ 'slide' }
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
          <View style={ [styles.expandableCellContainer, { height: this.state.datePickerExpanded ? this.state.datePickerHeight : 40 }]}>
            <ExpandableCell
              expanded={ this.state.datePickerExpanded }
              onPress={ () => this._onDatePickerExpand() }
              title={ expandableCellDatePickerTitle }>
              <DatePickerIOS
                date={ this.state.date }
                mode={ 'date' }
                onDateChange={ (date) => this._onDateChange(date) }
                onLayout={ (event) => this._getDatePickerHeight(event) }
              />
            </ExpandableCell>
          </View>
          <View style={ [styles.expandableCellContainer, { height: this.state.categoryPickerExpanded ? 200 : 40 }]}>
            <View style={ styles.categoryIcon }>
              { this.state.category && iconMethods.getIconComponent(this.state.category) }
            </View>
            <ExpandableCell
              expanded={ this.state.categoryPickerExpanded }
              onPress={ () => this._onCategoryPickerExpand() }
              title={ expandableCellCategoryPickerTitle }>
                <Picker
                onValueChange={ (value, index) => this._setItemCategory(value) }
                selectedValue={ this.state.category }>
                { this._renderCategoryPicker() }
              </Picker>
            </ExpandableCell>
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

  _onDateChange (date) {
    this.setState({
      date
    });
  }

  _onCategoryPickerExpand () {
    this.setState({
      categoryPickerExpanded: !this.state.categoryPickerExpanded
    })
  }

  _onDatePickerExpand () {
    this.setState({
      datePickerExpanded: !this.state.datePickerExpanded
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
