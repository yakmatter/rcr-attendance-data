// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    console.group('find-events-by-relations');
    const query = context.params.query;
    if (query && (query.team || query.attendance)) {
      console.log('query.team', query.team);
      console.log('query.attendance', query.attendance);

      context.result = {
        data: []
      };
      if (query.team) {
        console.log('query.team', query.team);
        const events = await context.app.service('/api/v1/events').find({ paginate: false });
        events.forEach(event => {
          if (event.teams.includes(query.team)) {
            context.result.data.push(event);
          }
        });
      }
      // if (query.attendance) {
      //   console.log('query.attendance', query.attendance);
      //   context.result.data = events.filter(event => event.attendances.includes(query.attendance));
      // }
    }

    console.log('context.result', context.result);
    console.groupEnd();

    return context;
  };
};
