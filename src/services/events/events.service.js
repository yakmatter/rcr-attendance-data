// Initializes the `events` service on path `/api/v1/events`
const { Events } = require('./events.class');
const createModel = require('../../models/events.model');
const hooks = require('./events.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/events', new Events(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/events');

  service.hooks(hooks);
};
