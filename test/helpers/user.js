const app = require('../../src/app');

module.exports = {
  async createTestUser() {
    return await app.service('users').create({
      strategy: 'local',
      email: 'messagetest@example.com',
      password: 'supersecret'
    });
  },
  async removeTestUser(id) {
    return await app.service('users').remove(id);
  }
};
