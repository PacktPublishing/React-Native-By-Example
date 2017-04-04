import { AsyncStorage } from 'react-native';

export const getAsyncStorage = async (key) => {
  let response = await AsyncStorage.getItem(key);
  let parsedData = JSON.parse(response) || {};

  return parsedData;
}

export const setAsyncStorage = async (key, value, callback) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));

  if (callback) {
    return callback();
  }

  return true;
}

export const resetAsyncStorage = (key) => {
  return setAsyncStorage(key, {});
}

export const logAsyncStorage = async (key) => {
  let response = await getAsyncStorage(key);

  console.log('Logging Async Storage');
  console.table(response);
}