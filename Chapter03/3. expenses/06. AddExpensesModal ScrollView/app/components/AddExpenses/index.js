import React, { Component, PropTypes } from 'react';

import {
  Button,
  View
} from 'react-native';

import AddExpensesModal from '../AddExpensesModal';

export default class AddExpenses extends Component {
  static propTypes = {
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);

    this.state = {
      modalVisible: false
    }
  }

  render () {
    console.log('re-rendered with modal visible?', this.state.modalVisible)
    return (
      <View>
        <AddExpensesModal
          modalVisible={ this.state.modalVisible }
          month={ this.props.month }
          toggleModal={ () => this._toggleModal(false) }
          year={ this.props.year }
        />
        <Button
          color={ '#86B2CA' }
          disabled={ this.state.modalVisible }
          onPress={ () => this._toggleModal(true) }
          title={ 'Add Expense' }
        />
      </View>
    )
  }

  _toggleModal (boolean) {
    this.setState({
      modalVisible: boolean
    });
    console.log('modal toggled, new value is', boolean)
  }
}
