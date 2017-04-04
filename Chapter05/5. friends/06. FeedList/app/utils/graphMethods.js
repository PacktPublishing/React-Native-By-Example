import {
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

const makeSingleGraphRequest = (request) => {
  return new GraphRequestManager().addRequest(request).start();
}

export const getFeed = (callback) => {
  const request = new GraphRequest('/me/feed', null, callback);

  makeSingleGraphRequest(request)
}
