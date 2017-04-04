import { Dimensions, Navigator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  androidAmountInput: {
    color: '#3D4A53',
    height: 40,
    margin: 10,
    padding: 10,
    width: 200
  },
  androidDescriptionInput: {
    color: '#3D4A53',
    height: 40,
    margin: 10,
    padding: 10
  },
  androidPickerContainers: {
    flex: 1,
    height: 40,
    marginBottom: 10
  },
  amountInput: {
    borderColor: '#86B2CA',
    borderRadius: 10,
    borderWidth: 1,
    color: '#3D4A53',
    height: 40,
    margin: 10,
    padding: 10,
    width: 200
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  amountText: {
    color: '#3D4A53',
    margin: 10,
    marginLeft: 20,
    paddingTop: 10
  },
  categoryIcon: {
    flex: 1,
    marginLeft: Dimensions.get('window').width - 50,
    position: 'absolute'
  },
  descriptionInput: {
    borderColor: '#86B2CA',
    borderRadius: 10,
    borderWidth: 1,
    color: '#3D4A53',
    height: 40,
    margin: 10,
    padding: 10
  },
  descriptionText: {
    color: '#3D4A53',
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10
  },
  expandableCellContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  headerText: {
    color: '#7D878D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  }
});

export default styles;
