import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

export const categories = {
  Books: {
    name: 'Books',
    iconName: 'book'
  },
  Car: {
    name: 'Car',
    iconName: 'car'
  },
  Coffee: {
    name: 'Coffee',
    iconName: 'coffee'
  },
  Drinks: {
    name: 'Drinks',
    iconName: 'beer'
  },
  Entertainment: {
    name: 'Entertainment',
    iconName: 'film'
  },
  Hobby: {
    name: 'Hobby',
    iconName: 'gamepad'
  },
  Home: {
    name: 'Home',
    iconName: 'home'
  },
  Grocery: {
    name: 'Grocery',
    iconName: 'shopping-cart'
  },
  Restaurant: {
    name: 'Restaurant',
    iconName: 'cutlery'
  },
  Shopping: {
    name: 'Shopping',
    iconName: 'shopping-bag'
  },
  Travel: {
    name: 'Travel',
    iconName: 'plane'
  },
  Utilities: {
    name: 'Utilities',
    iconName: 'plug'
  }
}

export const getIconComponent = (categoryName, size, color) => {
  return (
    <Icon
      name={ categories[categoryName].iconName }
      size={ size || 30 }
      color={ color || '#000000' } />
  );
}
