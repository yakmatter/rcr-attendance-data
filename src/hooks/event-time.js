const moment = require('moment');


const isToday = (event) => {
  return (
    /*
      @todo
      the server is in GMT, so moment endOf does not play nicely
      i probably need to store times in a different manner
     */
    moment(event.startTime).isSameOrBefore(moment().add(48, 'hours')) &&
    moment(event.startTime).isSameOrAfter(moment().subtract(48, 'hours'))
    // moment(event.startTime).isSameOrBefore(now.endOf('day')) &&
    // moment(event.startTime).isSameOrAfter(now.startOf('day'))
  );
};

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    if (context.params.query && context.params.query.isToday) {
      const events = await context.app.service('/api/v1/events').find({ paginate: false });
      const filterByIsToday = context.params.query.isToday === true || context.params.query.isToday.toLowerCase() !== 'false';
      // eslint-disable-next-line require-atomic-updates
      context.result = events.filter(event => {
        return isToday(event) === filterByIsToday;
      });
    }

    return context;
  };
};
