const users = require('./users/users.service.js');
const programs = require('./programs/programs.service.js');
const teams = require('./teams/teams.service.js');
const skaters = require('./skaters/skaters.service.js');
const events = require('./events/events.service.js');
const attendances = require('./attendances/attendances.service.js');
const volunteers = require('./volunteers/volunteers.service.js');
const reports = require('./reports/reports.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(programs);
  app.configure(teams);
  app.configure(skaters);
  app.configure(events);
  app.configure(attendances);
  app.configure(volunteers);
  app.configure(reports);
};
