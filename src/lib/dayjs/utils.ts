import dayjs from 'dayjs';

export const toDate = (date: string | number | Date | dayjs.Dayjs) => {
  return dayjs(date).format('YYYY/MM/DD');
};
