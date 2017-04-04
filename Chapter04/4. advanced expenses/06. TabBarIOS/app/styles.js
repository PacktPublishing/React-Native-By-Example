import { Navigator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
    marginBottom: 48
  },
  previousMonthsContainer: {
    flex: 1,
    marginBottom: 48
  }
});

export default styles;
