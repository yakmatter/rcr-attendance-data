const assert = require('assert');
const app = require('../../src/app');
const { createTestUser, removeTestUser } = require('../helpers/user');

let TEST_USER;
let TEST_ID;
let SKATER_ID;

describe('\'attendances\' service', () => {
  before(async() => {
    TEST_USER = await createTestUser();
    const params = { TEST_USER };

    const skater1 = await app.service('api/v1/skaters').create({
      name: 'attendancesTest',
      derbyName: 'attendancesTest',
      attendances: []
    }, params);
    SKATER_ID = skater1._id;
  });
  after(async() => {
    await removeTestUser(TEST_USER._id);
  });

  it('registered the service', () => {
    const service = app.service('api/v1/attendances');
    assert.ok(service, 'Registered the service');
  });

  it('creates attendance', async () => {
    const params = { TEST_USER };
    const attendance = await app.service('api/v1/attendances').create({
      skater: SKATER_ID,
      event: 'event',
      timeIn: '2019-10-13T21:00:00.000Z',
      timeOut: '2019-10-13T22:00:00.000Z',
      timestamp: 1570982894078,
      offSkates: false
    }, params);

    TEST_ID = attendance._id;

    assert.equal(attendance.skater, SKATER_ID);
    assert.equal(attendance.timeIn, '2019-10-13T21:00:00.000Z');
    assert.equal(attendance.timeOut, '2019-10-13T22:00:00.000Z');
    assert.equal(attendance.timestamp, 1570982894078);
    assert.equal(attendance.offSkates, false);
  });

  it('associates attendance with skater', async () => {
    const params = { TEST_USER };
    const skater = await app.service('api/v1/skaters').get(SKATER_ID, params);

    assert.deepEqual(skater.attendances, [TEST_ID]);
  });

  it('fetches attendance by id', async () => {
    const params = { TEST_USER };
    const attendance = await app.service('api/v1/attendances').get(TEST_ID, params);

    assert.equal(attendance.skater, SKATER_ID);
    assert.equal(attendance.event, 'event');
    assert.equal(attendance.timeIn, '2019-10-13T21:00:00.000Z');
    assert.equal(attendance.timeOut, '2019-10-13T22:00:00.000Z');
    assert.equal(attendance.timestamp, 1570982894078);
    assert.equal(attendance.offSkates, false);
  });

  it('fetches all attendances', async () => {
    const params = { TEST_USER };
    let attendances = await app.service('api/v1/attendances').find({ paginate: false }, params);
    const attendance = attendances.filter(attendance => attendance._id === TEST_ID)[0];

    assert.equal(attendance.skater, SKATER_ID);
    assert.equal(attendance.event, 'event');
    assert.equal(attendance.timeIn, '2019-10-13T21:00:00.000Z');
    assert.equal(attendance.timeOut, '2019-10-13T22:00:00.000Z');
    assert.equal(attendance.timestamp, 1570982894078);
    assert.equal(attendance.offSkates, false);
  });
});
