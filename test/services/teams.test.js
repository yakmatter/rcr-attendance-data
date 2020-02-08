const assert = require('assert');
const app = require('../../src/app');
const { createTestUser, removeTestUser } = require('../helpers/user');

let TEST_USER;
let TEST_ID;

describe('\'teams\' service', () => {
  before(async() => {
    TEST_USER = await createTestUser();
  });
  after(async() => {
    await removeTestUser(TEST_USER._id);
  });

  it('registered the service', () => {
    const service = app.service('api/v1/teams');
    assert.ok(service, 'Registered the service');
  });

  it('creates team', async () => {
    const params = { TEST_USER };
    const team = await app.service('api/v1/teams').create({
      name: 'name',
      apexName: 'apexName',
      sortOrder: 0,
      logo: 'foo/bar.png',
      program: 'program'
    }, params);

    TEST_ID = team._id;

    assert.equal(team.name, 'name');
    assert.equal(team.apexName, 'apexName');
    assert.equal(team.sortOrder, 0);
    assert.equal(team.logo, 'foo/bar.png');
    assert.equal(team.program, 'program');
  });

  it('fetches team by id', async () => {
    const params = { TEST_USER };
    const team = await app.service('api/v1/teams').get(TEST_ID, params);

    assert.equal(team.name, 'name');
    assert.equal(team.apexName, 'apexName');
    assert.equal(team.sortOrder, 0);
    assert.equal(team.logo, 'foo/bar.png');
    assert.equal(team.program, 'program');
  });

  it('fetches all teams', async () => {
    const params = { TEST_USER };
    const teams = await app.service('api/v1/teams').find({ paginate: false }, params);
    const team = teams[0];

    assert.equal(team.name, 'name');
    assert.equal(team.apexName, 'apexName');
    assert.equal(team.sortOrder, 0);
    assert.equal(team.logo, 'foo/bar.png');
    assert.equal(team.program, 'program');
  });
});
