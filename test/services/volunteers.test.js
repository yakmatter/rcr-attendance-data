const assert = require('assert');
const app = require('../../src/app');

describe('\'volunteers\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/volunteers');

    assert.ok(service, 'Registered the service');
  });
});
