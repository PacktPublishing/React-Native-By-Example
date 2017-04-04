import moment from 'moment';

export const getDateTimeString = (originalDateString) => {
  var jsDateObject = new Date(originalDateString);

  return moment(jsDateObject).format('lll');
}
