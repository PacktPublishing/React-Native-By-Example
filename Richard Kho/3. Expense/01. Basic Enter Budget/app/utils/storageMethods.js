import { AsyncStorage } from 'react-native';

export const getAsyncStorage = () => {
  return AsyncStorage.getItem('expenses')
    .then((response) => JSON.parse(response));
};

export const setAsyncStorage = (expenses) => {
  return AsyncStorage.setItem('expenses', JSON.stringify(expenses));
};

export const resetAsyncStorage = () => {
  return AsyncStorage.setItem('expenses', JSON.stringify({}));
};

export const logAsyncStorage = () => {
  getAsyncStorage()
    .then((parsedResult) => {
      console.log('Logging Async Storage');
      console.table(parsedResult);
    });
}

export const saveMonthlyBudget = (month, year, budget) => {
  return getAsyncStorage()
    .then((parsedResult) => {
      if (parsedResult === null) {
        parsedResult = {};
      }

      if (!parsedResult.hasOwnProperty(year)) {
        parsedResult[year] = {};
      }

      if (!parsedResult[year].hasOwnProperty(month)) {
        parsedResult[year][month] = {
          budget: undefined,
          expenses: []
        }
      }

      parsedResult[year][month].budget = budget;

      setAsyncStorage(parsedResult)
        .then((response) => {
          return true;
        })
    })
};

export const checkCurrentMonthBudget = (month, year) => {
  return getAsyncStorage()
    .then((parsedResult) => {
      if (parsedResult === null || !parsedResult.hasOwnProperty(year) || !parsedResult[year].hasOwnProperty(month)) {
        return false;
      }

      if (parsedResult[year][month].budget !== undefined) {
        return parsedResult[year][month].budget;
      }
    });
};

export const saveExpenseToMonth = (month, year, newExpenseDetails) => {
  return getAsyncStorage()
    .then((parsedResult) => {
      parsedResult[year][month].expenses.push(newExpenseDetails);

      setAsyncStorage(parsedResult)
        .then((response) => {
          return true;
        })
    })
};
