import moment from 'moment';

export const getDateTimeString = (date) => {
  return moment(date).format('lll');
}
