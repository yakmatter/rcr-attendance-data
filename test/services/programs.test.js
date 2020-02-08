const assert = require('assert');
const app = require('../../src/app');
const { createTestUser, removeTestUser } = require('../helpers/user');

let TEST_USER;
let TEST_ID;

describe('\'programs\' service', () => {
  before(async() => {
    TEST_USER = await createTestUser();
  });
  after(async() => {
    await removeTestUser(TEST_USER._id);
  });

  it('registered the service', () => {
    const service = app.service('api/v1/programs');
    assert.ok(service, 'Registered the service');
  });

  it('creates program', async () => {
    const params = { TEST_USER };
    const program = await app.service('api/v1/programs').create({
      name: 'name',
      sortOrder: 0,
      logo: 'foo/bar.png',
      teams: ['x', 'y', 'z']
    }, params);

    TEST_ID = program._id;

    assert.equal(program.name, 'name');
    assert.equal(program.sortOrder, 0);
    assert.equal(program.logo, 'foo/bar.png');
    assert.deepEqual(program.teams, ['x', 'y', 'z']);
  });

  it('fetches program by id', async () => {
    const params = { TEST_USER };
    const program = await app.service('api/v1/programs').get(TEST_ID, params);

    assert.equal(program.name, 'name');
    assert.equal(program.sortOrder, 0);
    assert.equal(program.logo, 'foo/bar.png');
    assert.deepEqual(program.teams, ['x', 'y', 'z']);
  });

  it('fetches all programs', async () => {
    const params = { TEST_USER };
    const programs = await app.service('api/v1/programs').find({ paginate: false }, params);
    const program = programs[0];

    assert.equal(program.name, 'name');
    assert.equal(program.sortOrder, 0);
    assert.equal(program.logo, 'foo/bar.png');
    assert.deepEqual(program.teams, ['x', 'y', 'z']);
  });
});
