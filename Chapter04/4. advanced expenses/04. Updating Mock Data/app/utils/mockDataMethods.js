import { setAsyncStorage } from './storageMethods';

const years = ['2017', '2016', '2015'];
const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const expenses = [
  {
    amount: '4',
    category: 'coffee',
    description: 'Latte'
  },
  {
    amount: '1.50',
    category: 'books',
    description: 'Sunday Paper'
  },
  {
    amount: '35',
    category: 'car',
    description: 'Gas'
  },
  {
    amount: '60',
    category: 'restaurant',
    description: 'Steak dinner'
  }
];

const mockObject = {
  budget: 500,
  expenses: expenses,
  spent: 100.5
};

export const mockPreviousMonthExpenses = async () => {
  let mockedPreviousMonthsExpensesObject = {};
  years.forEach((year) => {
    mockedPreviousMonthsExpensesObject[year] = {};

    months.forEach((month) => {
      if (year === '2017' && (parseInt(month) > 1)) {
        return;
      }

      mockedPreviousMonthsExpensesObject[year][month] = Object.assign({}, mockObject);
    });
  });

  setAsyncStorage(mockedPreviousMonthsExpensesObject);
}