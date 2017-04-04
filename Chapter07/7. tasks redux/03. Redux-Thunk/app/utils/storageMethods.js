import { AsyncStorage } from 'react-native';

export const getAsyncStorage = async () => {
  let response = await AsyncStorage.getItem('listOfTasks');
  let parsedData = JSON.parse(response) || [];

  return parsedData;
}

export const saveAsyncStorage = async (listOfTasks) => {
  return AsyncStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));
}
