import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export const categories = {
  books: {
    name: 'Books',
    iconName: 'book'
  },
  car: {
    name: 'Car',
    iconName: 'car'
  },
  coffee: {
    name: 'Coffee',
    iconName: 'coffee'
  },
  drinks: {
    name: 'Drinks',
    iconName: 'beer'
  },
  entertainment: {
    name: 'Entertainment',
    iconName: 'film'
  },
  hobby: {
    name: 'Hobby',
    iconName: 'gamepad'
  },
  home: {
    name: 'Home',
    iconName: 'home'
  },
  grocery: {
    name: 'Grocery',
    iconName: 'shopping-cart'
  },
  restaurant: {
    name: 'Restaurant',
    iconName: 'cutlery'
  },
  shopping: {
    name: 'Shopping',
    iconName: 'shopping-bag'
  },
  travel: {
    name: 'Travel',
    iconName: 'plane'
  },
  utilities: {
    name: 'Utilities',
    iconName: 'plug'
  }
}

export const getIconComponent = (categoryName, size, color) => {
  return (
    <Icon
      name={ categories[categoryName].iconName }
      size={ size || 30 }
      color={ color || '#3D4A53' }
    />
  );
}
