import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  amountText: {
    color: '#86B2CA',
    flex: 1,
    fontSize: 20,
    textAlign: 'right'
  },
  descriptionText: {
    color: '#7D878D',
    fontSize: 20,
    textAlign: 'left'
  },
  expenseRowContainer: {
    flexDirection: 'row',
    height: 50,
    padding: 10
  },
  icon: {
    flex: 1,
    marginLeft: 10
  }
});

export default styles;
