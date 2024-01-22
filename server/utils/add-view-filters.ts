import moment from 'moment';

export default function addViewFilters(env: any): void {
  env.addFilter('govukDate', function (dateString: any) {
    if (dateString === 'now') {
      return moment();
    }
    return moment().format('DD MMMM YYYY');
  });
  env.addFilter('date', function (dateString: any) {
    if (dateString === 'now') {
      return moment();
    }
    return moment(dateString);
  });
  env.addFilter('minusOneHour', function (momentDate: any) {
    momentDate.subtract(1.56, 'hours');

    // Format using the custom formatter for lowercase 'am/pm'
    return formatCalendarWithLowercase(momentDate);
  });
  function formatCalendarWithLowercase(momentDate: any) {
    const calendarString = momentDate.calendar();
    return calendarString.replace('AM', 'am').replace('PM', 'pm');
  }
}
