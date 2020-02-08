// Initializes the `volunteers` service on path `/api/v1/volunteers`
const { Volunteers } = require('./volunteers.class');
const createModel = require('../../models/volunteers.model');
const hooks = require('./volunteers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/volunteers', new Volunteers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/volunteers');

  service.hooks(hooks);
};
