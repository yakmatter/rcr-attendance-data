// Initializes the `reports` service on path `/api/v1/reports`
const { Reports } = require('./reports.class');
const createModel = require('../../models/reports.model');
const hooks = require('./reports.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/reports', new Reports(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/reports');

  service.hooks(hooks);
};
