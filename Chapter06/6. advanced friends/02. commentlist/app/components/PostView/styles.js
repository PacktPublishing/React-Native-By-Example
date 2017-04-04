import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  commentListContainer: {
    flex: 1,
    marginTop: 20
  },
  container: {
    flex: 1,
    margin: 10,
    marginTop: 75,
  },
  created: {
    color: '#365899',
    fontWeight: 'bold',
    marginBottom: 5
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailsRow: {
    color: '#365899',
    marginBottom: 15,
    marginTop: 15,
    textAlign: 'left'
  },
  separator: {
    height: 2,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#365899'
  },
  story: {
    marginBottom: 5,
    textDecorationLine: 'underline'
  }
});

export default styles;
