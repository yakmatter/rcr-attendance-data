const assert = require('assert');
const app = require('../../src/app');
const { createTestUser, removeTestUser } = require('../helpers/user');

let TEST_USER;
let TEST_ID;

describe('\'skaters\' service', () => {
  before(async() => {
    TEST_USER = await createTestUser();
  });
  after(async() => {
    await removeTestUser(TEST_USER._id);
  });

  it('registered the service', () => {
    const service = app.service('api/v1/skaters');
    assert.ok(service, 'Registered the service');
  });

  it('creates skater', async () => {
    const params = { TEST_USER };
    const skater = await app.service('api/v1/skaters').create({
      name: 'name',
      derbyName: 'derbyName',
      team: 'team',
      attendances: ['x', 'y', 'z']
    }, params);

    TEST_ID = skater._id;

    assert.equal(skater.name, 'name');
    assert.equal(skater.derbyName, 'derbyName');
    assert.equal(skater.team, 'team');
    assert.deepEqual(skater.attendances, ['x', 'y', 'z']);
  });

  it('fetches skater by id', async () => {
    const params = { TEST_USER };
    const skater = await app.service('api/v1/skaters').get(TEST_ID, params);

    assert.equal(skater.name, 'name');
    assert.equal(skater.derbyName, 'derbyName');
    assert.equal(skater.team, 'team');
    assert.deepEqual(skater.attendances, ['x', 'y', 'z']);
  });

  it('fetches all skaters', async () => {
    const params = { TEST_USER };
    let skaters = await app.service('api/v1/skaters').find({ paginate: false }, params);
    const skater = skaters.filter(skater => skater._id === TEST_ID)[0];

    assert.equal(skater.name, 'name');
    assert.equal(skater.derbyName, 'derbyName');
    assert.equal(skater.team, 'team');
    assert.deepEqual(skater.attendances, ['x', 'y', 'z']);
  });

  it('finds skater by name', async () => {
    const params = { TEST_USER };
    const skaters = await app.service('api/v1/skaters').find({ query: { $search: 'BYn' } }, params);
    const skater = skaters.data[0];

    assert.equal(skater.name, 'name');
    assert.equal(skater.derbyName, 'derbyName');
    assert.equal(skater.team, 'team');
    assert.deepEqual(skater.attendances, ['x', 'y', 'z']);
  });
});
