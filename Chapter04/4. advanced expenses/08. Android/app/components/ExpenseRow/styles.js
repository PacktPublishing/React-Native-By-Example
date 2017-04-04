import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  amountText: {
    alignSelf: 'center',
    color: '#86B2CA',
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    textAlign: 'right'
  },
  descriptionText: {
    alignSelf: 'center',
    color: '#7D878D',
    fontSize: 16,
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
