import { AsyncStorage } from 'react-native';

import * as dateMethods from './dateMethods';

export const getAsyncStorage = async () => {
  let response = await AsyncStorage.getItem('expenses');
  let parsedData = JSON.parse(response) || {};

  return parsedData;
}

export const setAsyncStorage = (expenses) => {
  return AsyncStorage.setItem('expenses', JSON.stringify(expenses));
}

export const checkCurrentMonthBudget = async () => {
  let year = dateMethods.getYear();
  let month = dateMethods.getMonth();

  let response = await getAsyncStorage();

  if (response === null || !response.hasOwnProperty(year) || !response[year].hasOwnProperty(month)) {
    return false;
  }

  return response[year][month].budget;
}

export const saveMonthlyBudget = async (month, year, budget) => {
  let response = await getAsyncStorage();

  if (!response.hasOwnProperty(year)) {
    response[year] = {};
  }

  if (!response[year].hasOwnProperty(month)) {
    response[year][month] = {
      budget: undefined,
      expenses: []
    }
  }

  response[year][month].budget = budget;

  await setAsyncStorage(response);

  return;
}

export const resetAsyncStorage = () => {
  return setAsyncStorage({});
}

export const logAsyncStorage = async () => {
  let response = await getAsyncStorage();

  console.log('Logging Async Storage');
  console.table(response);
}