import React, { Component, PropTypes } from 'react';

import {
  Button,
  View
} from 'react-native';

export default class AddExpenses extends Component {
  static propTypes = {
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <View>
        <Button
          color={ '#86B2CA' }
          onPress={ () => alert('Add Expenses Button pressed!') }
          title={ 'Add Expense' }
        />
      </View>
    )
  }
}
