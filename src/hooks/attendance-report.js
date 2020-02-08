
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const attendances = await context.app.service('/api/v1/attendances').find({ paginate: false });
    const skaters = await context.app.service('/api/v1/skaters').find({ paginate: false });
    const teams = await context.app.service('/api/v1/teams').find({ paginate: false });
    const events = await context.app.service('/api/v1/events').find({ paginate: false });

    let json = [];

    attendances.forEach(attendance => {
      let event = events.find(event => event._id === attendance.event);
      let skater = skaters.find(skater => skater._id === attendance.skater);
      let team = teams.find(team => team._id === skater.team);
      let row = {
        attended: (attendance.timeIn) ? true : false,
        eventStartTime: (event) ? event.startTime : undefined,
        timeIn: attendance.timeIn || undefined,
        offSkates: attendance.offSkates || false,
        event: (event) ? event.name : undefined,
        skater: (skater) ? skater.name : undefined,
        derbyName: (skater) ? skater.derbyName : undefined,
        team: (team) ? team.name : undefined
      };

      json.push(row);
    });

    context.result = json;
    return context;
  };
};
