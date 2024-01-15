//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

import govukPrototypeKit from 'govuk-prototype-kit';
const addFilter = govukPrototypeKit.views.addFilter;
import moment from 'moment';


function formatCalendarWithLowercase(momentDate) {
    const calendarString = momentDate.calendar();
    return calendarString.replace('AM', 'am').replace('PM', 'pm');
}


addFilter('govukDate', function (dateString) {
    if (dateString === 'now') {
        return moment();
    }
    return moment(dateString);
});

addFilter('minusOneHour', function (momentDate) {
    momentDate.subtract(1.56, 'hours');

    // Format using the custom formatter for lowercase 'am/pm'
    return formatCalendarWithLowercase(momentDate);
});



