import React, { Component, PropTypes } from 'react';

import {
  DatePickerIOS,
  Modal,
  Text,
  TextInput,
  View
} from 'react-native';

import moment from 'moment';
import styles from './styles';

import ExpandableCell from '../ExpandableCell';

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
      date: new Date(),
      description: '',
      expanded: false
    }
  }

  render () {
    const expandableCellTitle = 'Date: ' + moment(this.state.date).format('ll') + ' (tap to change)';

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
          <View style={ [styles.expandableCellContainer, { maxHeight: this.state.expanded ? this.state.datePickerHeight : 40 }]}>
            <ExpandableCell
              expanded={ this.state.expanded }
              onPress={ () => this._onExpand() }
              title={ expandableCellTitle }>
              <DatePickerIOS
                date={ this.state.date }
                mode={ 'date' }
                onDateChange={ (date) => this._onDateChange(date) }
                onLayout={ (event) => this._getDatePickerHeight(event) }
              />
            </ExpandableCell>
          </View>
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

  _onExpand () {
    this.setState({
      expanded: !this.state.expanded
    });
  }
}
