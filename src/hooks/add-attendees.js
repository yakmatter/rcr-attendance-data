// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    console.group('add-attendees');

    let event = context.result;
    event.attendances = [];

    /* fetch each team */
    let teamsPromises = [];
    event.teams.forEach(team => {
      teamsPromises.push(
        context.app.service('/api/v1/teams').get(team)
      );
    });
    const teams = await Promise.all(teamsPromises);


    /* create each attendance */
    let attendancePromises = [];
    teams.forEach(team => {
      team.skaters.forEach(skater => {
        const attendance = {
          event: event._id,
          skater: skater
        };
        console.log('attendance', attendance);
        attendancePromises.push(
          context.app.service('/api/v1/attendances').create(attendance)
        );
      });
    });
    let attendances = await Promise.all(attendancePromises);

    /* push each attendance to event */
    attendances.forEach(attendance => {
      event.attendances.push(attendance._id);
    });

    await context.app.service('/api/v1/events').patch(
      context.result._id,
      { attendances: event.attendances }
    );

    console.log('event.attendances', event.attendances);
    console.groupEnd();

    return context;
  };
};
