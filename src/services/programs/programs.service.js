// Initializes the `programs` service on path `/api/v1/programs`
const { Programs } = require('./programs.class');
const createModel = require('../../models/programs.model');
const hooks = require('./programs.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/programs', new Programs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/programs');

  service.hooks(hooks);
};
