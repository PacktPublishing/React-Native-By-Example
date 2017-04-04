import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  collapsibleContent: {
    flex: 1,
    overflow: 'hidden',
  },
  secondaryDetails: {
    flex: 1,
    textAlign: 'right'
  },
  textRow: {
    flex: 1,
    flexDirection: 'row',
    height: 30
  },
  visibleContent: {
    flex: 1,
    textAlign: 'left'
  }
});

export default styles;
