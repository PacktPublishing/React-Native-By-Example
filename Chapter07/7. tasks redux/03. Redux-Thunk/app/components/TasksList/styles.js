import { Navigator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  androidTextInput: {
    height: 40,
    margin: 10,
    padding: 10
  },
  container: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },
  listView: {
    margin: 10,
    padding: 10
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    margin: 10,
    padding: 10
  }
});

export default styles;
