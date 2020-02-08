const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user, encrypts password', async () => {
    const user = await app.service('users').create({
      strategy: 'local',
      email: 'test@example.com',
      password: 'secret'
    });

    assert.equal(user.email, 'test@example.com');
    assert.ok(user.password !== 'secret');
  });
});
