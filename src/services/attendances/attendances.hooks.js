const { authenticate } = require('@feathersjs/authentication').hooks;
const relateAttendanceToSkater = require('../../hooks/relate-attendance-to-skater');
const checkPermissions = require('feathers-permissions');
const { ADMIN_ROLE } = require('../../constants/roles');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [ checkPermissions(ADMIN_ROLE) ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ relateAttendanceToSkater() ],
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
