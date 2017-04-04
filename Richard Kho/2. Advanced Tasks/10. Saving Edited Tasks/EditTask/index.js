import React, { Component } from 'react';

import {
  DatePickerIOS,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import ExpandableCell from '../ExpandableCell';
import styles from './styles';

class EditTask extends Component {
  constructor (props) {
    super (props);

    const date = new Date();

    this.state = {
      completed: this.props.details.completed,
      date: date,
      expanded: false,
      formattedDate: this._formatDate(date),
      text: this.props.details.text
    }
  }

  componentWillMount () {
    this.setState({
      dateSelected: this.props.details.dueDate ? true : false
    })
  }

  render () {
    return (
      <View style={ styles.editTaskContainer }>
        <View>
          <TextInput
            autoCorrect={ false }
            onChangeText={ (text) => this._onTextChange(text) }
            returnKeyType={ 'done' }
            style={ styles.textInput }
            value={ this.state.text }
          />
        </View>
        <View style={ [styles.container, { maxHeight: this.state.expanded ? this.state.datePickerHeight : 40 }] }>
          <ExpandableCell
            childrenHeight={ this.state.datePickerHeight }
            textConditionals={{
              dueDateAssigned: this.props.details.dueDate,
              dateSelected: this.state.dateSelected,
              secondaryDetails: this.state.formattedDate,
              empty: 'Set Reminder',
              assigned: 'Due On'
            }}
            onPress={ () => this._onExpand() }>
            <DatePickerIOS
              date={ this.state.date }
              onDateChange={ (date) => this._onDateChange(date) }
              onLayout={ (event) => this._getComponentHeight(event) }
              style={ styles.datePicker } />
          </ExpandableCell>
        </View>
        <View>
          <TouchableHighlight
            disabled={ !this.state.dateSelected }
            onPress={ () => this._clearDate() }
            style={ styles.clearDateRow }
            underlayColor={ '#D3D3D3' }>
            <View
              style={ styles.noDateRow }>
              <Text
                style={ [styles.clearDateText, { color: this.state.dateSelected ? 'red' : 'gray'}] }>
                Clear Date
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={ styles.switchContainer }>
          <Text
            style={ styles.switchText }>
            Completed
          </Text>
          <Switch
            onValueChange={ (value) => this._onValueChange(value) }
            style={ styles.switch }
            value={ this.state.completed }/>
        </View>
      </View>
    )
  }

  _clearDate () {
    this.setState({
      dateSelected: false
    })

    this.props.clearDate();
  }

  _formatDate (date) {
    return date.toDateString() + ' ' + date.toLocaleTimeString(navigator.language, { hour:'2-digit', minute:'2-digit'})
  }

  _getComponentHeight (event) {
    this.setState({
      datePickerHeight: event.nativeEvent.layout.height
    });
  }

  _onDateChange (date) {

    const formattedDate = this._formatDate(date);

    this.setState({
      date: date,
      dateSelected: true,
      formattedDate: formattedDate
    });

    this.props.changeTaskDue(date, formattedDate);
  }

  _onExpand () {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  _onTextChange (text) {
    this.setState({
      text: text
    });

    this.props.changeTaskName(text);
  }

  _onValueChange (value) {
    this.setState({
      completed: value
    });

    this.props.changeTaskStatus(value);
  }
}

export default EditTask;
