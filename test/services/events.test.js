const assert = require('assert');
const app = require('../../src/app');
const { createTestUser, removeTestUser } = require('../helpers/user');
const moment = require('moment');

let TEST_USER;
let TEST_ID;
let TEAM_IDS = [];
let SKATER_IDS = [];

describe('\'events\' service', () => {
  before(async() => {
    TEST_USER = await createTestUser();
    const params = { TEST_USER };

    const team1 = await app.service('api/v1/teams').create({
      name: 'name',
      apexName: 'apexName',
      sortOrder: 0,
      logo: 'foo/bar.png',
      program: 'program'
    }, params);
    TEAM_IDS.push(team1._id);

    const team2 = await app.service('api/v1/teams').create({
      name: 'name',
      apexName: 'apexName',
      sortOrder: 0,
      logo: 'foo/bar.png',
      program: 'program'
    }, params);
    TEAM_IDS.push(team2._id);

    const skater1 = await app.service('api/v1/skaters').create({
      name: 'eventsTest',
      derbyName: 'eventsTest',
      team: team1._id,
      attendances: []
    }, params);
    SKATER_IDS.push(skater1._id);

    const skater2 = await app.service('api/v1/skaters').create({
      name: 'eventsTest',
      derbyName: 'eventsTest',
      team: team2._id,
      attendances: []
    }, params);
    SKATER_IDS.push(skater2._id);

    /* @todo
      write a hook to associate skaters with team on create skater
     */
    await app.service('api/v1/teams').patch(team1._id, {
      skaters: [skater1._id]
    });
    await app.service('api/v1/teams').patch(team2._id, {
      skaters: [skater2._id]
    });
  });
  after(async() => {
    await removeTestUser(TEST_USER._id);
    for (let i = 0; i < TEAM_IDS.length; i++) {
      await app.service('api/v1/teams').remove(TEAM_IDS[i]);
    }
    for (let i = 0; i < SKATER_IDS.length; i++) {
      await app.service('api/v1/skaters').remove(SKATER_IDS[i]);
    }
  });

  it('registered the service', () => {
    const service = app.service('api/v1/events');
    assert.ok(service, 'Registered the service');
  });

  it('creates event', async () => {
    const params = { TEST_USER };

    const event = await app.service('api/v1/events').create({
      name: 'name',
      startTime: '2019-10-12T22:00:00.000Z',
      endTime: '2019-10-12T23:00:00.000Z',
      credits: 1,
      type: 'practice',
      teams: TEAM_IDS,
      attendances: []
    }, params);

    TEST_ID = event._id;

    assert.equal(event.name, 'name');
    assert.equal(event.startTime, '2019-10-12T22:00:00.000Z');
    assert.equal(event.endTime, '2019-10-12T23:00:00.000Z');
    assert.equal(event.credits, 1);
    assert.equal(event.type, 'practice');
    assert.deepEqual(event.teams, TEAM_IDS);
    assert.deepEqual(event.attendances.length, 2);
  });

  it('fetches event by id', async () => {
    const params = { TEST_USER };
    const event = await app.service('api/v1/events').get(TEST_ID, params);

    assert.equal(event.name, 'name');
    assert.equal(event.startTime, '2019-10-12T22:00:00.000Z');
    assert.equal(event.endTime, '2019-10-12T23:00:00.000Z');
    assert.equal(event.credits, 1);
    assert.equal(event.type, 'practice');
    assert.deepEqual(event.teams, TEAM_IDS);
    assert.deepEqual(event.attendances.length, 2);
  });

  it('fetches all events', async () => {
    const params = { TEST_USER };
    const events = await app.service('api/v1/events').find({ paginate: false }, params);
    const event = events[0];

    assert.equal(event.name, 'name');
    assert.equal(event.startTime, '2019-10-12T22:00:00.000Z');
    assert.equal(event.endTime, '2019-10-12T23:00:00.000Z');
    assert.equal(event.credits, 1);
    assert.equal(event.type, 'practice');
    assert.deepEqual(event.teams, TEAM_IDS);
    assert.deepEqual(event.attendances.length, 2);
  });

  it('does not find isToday for tomorrow event', async () => {
    const params = { TEST_USER };

    await app.service('api/v1/events').create({
      name: 'name',
      startTime: moment().add(1, 'day').format(),
      endTime: moment().add(1, 'day').add(1, 'hour').format(),
      credits: 1,
      type: 'practice',
      teams: TEAM_IDS,
      attendances: []
    }, params);

    const events = await app.service('api/v1/events').find({ query: { isToday: true } , paginate: false }, params);

    assert.equal(events.length, 0);
  });

  it('finds isToday for today event', async () => {
    const params = { TEST_USER };

    const todayEvent = await app.service('api/v1/events').create({
      name: 'name',
      startTime: moment().format(),
      endTime: moment().add(1, 'hour').format(),
      credits: 1,
      type: 'practice',
      teams: TEAM_IDS,
      attendances: []
    }, params);

    const events = await app.service('api/v1/events').find({ query: { isToday: true } , paginate: false }, params);

    assert.equal(events[0]._id, todayEvent._id);
  });
});
