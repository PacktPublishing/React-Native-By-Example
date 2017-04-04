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

  let details = response[year][month];

  return {
    budget: details.budget,
    spent: details.spent
  }
}

export const saveMonthlyBudget = async (month, year, budget) => {
  let response = await getAsyncStorage();

  if (!response.hasOwnProperty(year)) {
    response[year] = {};
  }

  if (!response[year].hasOwnProperty(month)) {
    response[year][month] = {
      budget: undefined,
      expenses: [],
      spent: 0
    }
  }

  response[year][month].budget = budget;

  await setAsyncStorage(response);

  return;
}

export const getMonthObject = async (month, year) => {
  let response = await getAsyncStorage();

  if (response[year] && response[year][month]) {
    return response[year][month];
  }
}

const getTotalSpentForMonth = (array) => {
  let total = 0;

  array.forEach((elem) => {
    total += parseInt(elem.amount)
  });

  return total;
}

export const saveItemToBudget = async (month, year, expenseObject) => {
  let response = await getAsyncStorage();

  let newExpensesArray = [
    ...response[year][month].expenses,
    expenseObject
  ];

  let newTotal = getTotalSpentForMonth(newExpensesArray);

  response[year][month].expenses = newExpensesArray;
  response[year][month].spent = newTotal;

  await setAsyncStorage(response);

  return true;
}

export const resetAsyncStorage = () => {
  return setAsyncStorage({});
}

export const logAsyncStorage = async () => {
  let response = await getAsyncStorage();

  console.log('Logging Async Storage');
  console.table(response);
}