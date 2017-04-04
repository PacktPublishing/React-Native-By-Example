import { Navigator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  androidButtonContainer: {
    flex: 1,
    maxHeight: 60,
    margin: 10
  },
  editTaskContainer: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  },
  expandableCellContainer: {
    flex: 1
  },
  clearDateButtonContainer: {
    flex: 1
  },
  saveButton: {
    flex: 1,
    marginTop: 20,
    maxHeight: 70,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 50,
    padding: 10
  },
  switchText: {
    fontSize: 16
  },
  textInput: {
    height: 40,
    margin: 10,
    padding: 10
  }
});

export default styles;
