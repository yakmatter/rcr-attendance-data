const { authenticate } = require('@feathersjs/authentication').hooks;
const role = require('../../hooks/role');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const app = feathers().configure(configuration());
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const checkPermissions = require('feathers-permissions');
const { ADMIN_ROLE, ALL_ROLES } = require('../../constants/roles');

/*
  only allow the 'admin' role to create users
  except in test environment
 */
const modifyUsersRole = app.get('allowAccountCreation') ? ALL_ROLES : ADMIN_ROLE;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [
      hashPassword('password'),
      authenticate('jwt'),
      checkPermissions(modifyUsersRole) // only the admin can modify users
    ],
    update: [
      hashPassword('password'),
      authenticate('jwt'),
      checkPermissions(modifyUsersRole) // only the admin can modify users
    ],
    patch: [
      hashPassword('password'),
      authenticate('jwt'),
      checkPermissions(modifyUsersRole) // only the admin can modify users
    ],
    remove: [
      authenticate('jwt'),
      checkPermissions(modifyUsersRole) // only the admin can modify users
    ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [ role() ],
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
