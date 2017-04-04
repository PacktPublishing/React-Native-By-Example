import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  currentMonthExpensesContainer: {
    flex: 1
  },
  currentMonthExpensesHeader: {
    height: 80,
  },
  headerText: {
    color: '#7D878D',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  listViewContainer: {
    flex: 1,
    marginTop: 20
  },
  progressView: {
    margin: 10
  },
  rowSeparator: {
    backgroundColor: '#7D878D',
    flex: 1,
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    marginRight: 15
  },
  subText: {
    color: '#3D4A53',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default styles;
