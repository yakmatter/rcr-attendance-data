const assert = require('assert');
const app = require('../../src/app');

describe('\'reports\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/reports');

    assert.ok(service, 'Registered the service');
  });
});
