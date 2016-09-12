import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
  },
  visibleContent: {
    fontSize: 24
  },
  collapsibleContent: {
    flex: 1,
    overflow: 'hidden',
  }
});

export default styles;
