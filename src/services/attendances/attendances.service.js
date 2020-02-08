// Initializes the `attendances` service on path `/api/v1/attendances`
const { Attendances } = require('./attendances.class');
const createModel = require('../../models/attendances.model');
const hooks = require('./attendances.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/attendances', new Attendances(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/attendances');

  service.hooks(hooks);
};
