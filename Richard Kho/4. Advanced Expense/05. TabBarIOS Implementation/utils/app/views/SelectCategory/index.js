import React, { Component } from 'react';

import {
  Image,
  ListView,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import * as iconMethods from '../../utils/iconMethods';

class SelectCategory extends Component {

  constructor (props) {
    super (props);
    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listOfCategories: Object.keys(iconMethods.categories),
    }
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.state.listOfCategories);
    const categories = iconMethods.categories;

    return (
      <View
        style={ styles.container }>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={ (rowData, sectionID, rowID) =>
            <TouchableHighlight
              style={ styles.button }
              onPress={ () => this._setCategory(rowData) }>
              <View
                style={ styles.categoryRow }>
                <Text
                  style={ styles.text }>
                  { rowData }
                </Text>
                <View
                  style={ styles.icon }>
                { iconMethods.getIconComponent(rowData, 30, '#D7DCDE') }
                </View>
              </View>
            </TouchableHighlight>
          } />
      </View>
    )
  }

  _setCategory (categoryName) {
    this.props.setCategory(categoryName);
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 40
  },
  container: {
    flex: 1
  },
  categoryRow: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    textAlign: 'left',
    padding: 10
  },
  icon: {
    padding: 10
  }
})

export default SelectCategory;