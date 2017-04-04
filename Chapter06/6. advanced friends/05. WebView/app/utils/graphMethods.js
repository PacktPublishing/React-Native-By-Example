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

export const getPostDetails = (id, batchCallback) => {
  let resultsObject = {
    attachments: undefined,
    comments: undefined,
    likes: undefined
  }

  const attachmentsRequest = new GraphRequest('/' + id + '/attachments', null, (error, response) => {
    if (error) {
      console.log(error);
    }
    resultsObject.attachments = response.data;
  });

  const commentsRequest = new GraphRequest('/' + id + '/comments', null, (error, response) => {
    if (error) {
      console.log(error);
    }
    resultsObject.comments = response.data;
  });

  const likesRequest = new GraphRequest('/' + id + '/likes', null, (error, response) => {
    if (error) {
      console.log(error);
    }
    resultsObject.likes = response.data;
  });

  new GraphRequestManager()
    .addRequest(attachmentsRequest)
    .addRequest(commentsRequest)
    .addRequest(likesRequest)
    .addBatchCallback(() => batchCallback(resultsObject))
    .start();
}
