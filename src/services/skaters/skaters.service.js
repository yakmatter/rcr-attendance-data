// Initializes the `skaters` service on path `/api/v1/skaters`
const { Skaters } = require('./skaters.class');
const createModel = require('../../models/skaters.model');
const hooks = require('./skaters.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const whitelist = ['$text', '$regex', '$where'];
  const options = {
    Model,
    paginate,
    whitelist
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/skaters', new Skaters(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/skaters');

  service.hooks(hooks);
};
