// Initializes the `teams` service on path `/api/v1/teams`
const { Teams } = require('./teams.class');
const createModel = require('../../models/teams.model');
const hooks = require('./teams.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/teams', new Teams(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/teams');

  service.hooks(hooks);
};
