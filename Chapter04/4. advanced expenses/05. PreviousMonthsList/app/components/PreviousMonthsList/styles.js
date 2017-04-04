import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  previousMonthsListContainer: {
    flex: 1
  },
  rowBudget: {
    color: '#86B2CA',
    flex: 1,
    fontSize: 20,
    marginRight: 10,
    textAlign: 'right'
  },
  rowDataContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    height: 30
  },
  rowMonth: {
    color: '#7D878D',
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
    textAlign: 'left'
  },
  rowSeparator: {
    backgroundColor: '#7D878D',
    flex: 1,
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    marginRight: 15
  },
  sectionHeader: {
    height: 20,
    backgroundColor: '#86B2CA'
  },
  sectionText: {
    color: '#7D878D',
    marginLeft: 10
  }
});

export default styles;
