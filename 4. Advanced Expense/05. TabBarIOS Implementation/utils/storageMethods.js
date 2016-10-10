import { AsyncStorage } from 'react-native';

export const getAsyncStorage = () => {
  return AsyncStorage.getItem('expenses')
    .then((response) => JSON.parse(response));
};

export const setAsyncStorage = (expenses, callback) => {
  return AsyncStorage.setItem('expenses', JSON.stringify(expenses), () => {
    if (callback) {
      return callback();
    }

    if (!callback) {
      return true;
    }
  });
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

export const saveMonthlyBudget = (month, year, budget, callback) => {
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

export const getBudgetForSpecificMonth = (month, year) => {
  return getAsyncStorage()
    .then((parsedResult) => {
      return parsedResult[year][month];
    });
};

export const saveExpenseToMonth = (month, year, newExpenseDetails, callback) => {
  return getAsyncStorage()
    .then((parsedResult) => {
      parsedResult[year][month].expenses.push(newExpenseDetails);
      setAsyncStorage(parsedResult, callback)
        .then((response) => {
          return response;
        })
    })
};

const years = ['2016', '2015', '2014'];
const months = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];
const expenses = [
  {
    amount: '4',
    category: 'Coffee',
    description: 'Latte @ Starbucks'
  },
  {
    amount: '1.50',
    category: 'Books',
    description: 'Sunday Paper'
  },
  {
    amount: '35',
    category: 'Car',
    description: 'Gas'
  },
  {
    amount: '60',
    category: 'Restaurant',
    description: 'Steak dinner'
  }
]

export const mockPreviousMonthsExpenses = () => {
  let mockedPreviousMonthsExpensesObject = {};

  years.forEach((year) => {
    mockedPreviousMonthsExpensesObject[year] = {};

    months.forEach((month) => {
      if (year === '2016' && (parseInt(month) > 9)) {
        return;
      }
      mockedPreviousMonthsExpensesObject[year][month] = {};
      mockedPreviousMonthsExpensesObject[year][month].budget = 500;
      mockedPreviousMonthsExpensesObject[year][month].expenses = expenses;
    });
  });

  setAsyncStorage(mockedPreviousMonthsExpensesObject, (res) => {
    console.log('success! ' + res);
  })
};
