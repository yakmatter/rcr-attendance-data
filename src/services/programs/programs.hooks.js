const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const { ADMIN_ROLE } = require('../../constants/roles');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
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
    create: [],
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
