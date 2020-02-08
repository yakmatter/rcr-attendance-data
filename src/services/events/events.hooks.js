const { authenticate } = require('@feathersjs/authentication').hooks;
const findEventsByRelations = require('../../hooks/find-events-by-relations');
const addAttendees = require('../../hooks/add-attendees');
const checkPermissions = require('feathers-permissions');
const { ADMIN_ROLE } = require('../../constants/roles');

const eventTime = require('../../hooks/event-time');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ findEventsByRelations(), eventTime() ],
    get: [],
    create: [ checkPermissions(ADMIN_ROLE) ],
    update: [ checkPermissions(ADMIN_ROLE) ],
    patch: [ checkPermissions(ADMIN_ROLE) ],
    remove: [ checkPermissions(ADMIN_ROLE) ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ addAttendees() ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
