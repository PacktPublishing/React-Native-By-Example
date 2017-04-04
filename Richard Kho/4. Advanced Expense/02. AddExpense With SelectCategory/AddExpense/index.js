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

import * as storageMethods from '../../utils/storageMethods';

import AddExpenseModal from '../AddExpenseModal';

class AddExpense extends Component {
  constructor (props) {
    super (props);

    this.state = {
      categorySelected: undefined,
      addExpenseModalVisible: false
    }
  }

  render () {
    return (
      <View>
        <AddExpenseModal
          addExpenseModalVisible={ this.state.addExpenseModalVisible }
          dismissedAddExpenseModal={ this.props.dismissedModal }
          month={ this.props.month }
          toggleModal={ () => this._toggleModal() }
          updateList={ () => this.props.updateList() }
          year={ this.props.year }
          />
        <TouchableHighlight
          style={ styles.addButton }
          onPress={ () => this._toggleModal() }>
          <Text
            style={ styles.addButtonText }>
            Add Expense
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  _toggleModal () {
    this.setState({
      addExpenseModalVisible: !this.state.addExpenseModalVisible
    });
  }
}

const styles = StyleSheet.create({
  addButton: {
    height: 40,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: '#00AAFF'
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: 20
  }
})

export default AddExpense;
