import React, { Component, PropTypes } from 'react';

import {
  Button,
  View
} from 'react-native';

import AddExpensesModal from '../AddExpensesModal';

export default class AddExpenses extends Component {
  static propTypes = {
    month: PropTypes.string.isRequired,
    updateExpenses: PropTypes.func.isRequired,
    year: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);

    this.state = {
      modalVisible: false
    }
  }

  render () {
    return (
      <View>
        <AddExpensesModal
          modalVisible={ this.state.modalVisible }
          month={ this.props.month }
          toggleModal={ () => this._toggleModal() }
          year={ this.props.year }
        />
        <Button
          color={ '#86B2CA' }
          disabled={ this.state.modalVisible }
          onPress={ () => this._toggleModal() }
          title={ 'Add Expense' }
        />
      </View>
    )
  }

  _toggleModal (boolean) {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
    this.props.updateExpenses();
  }
}
