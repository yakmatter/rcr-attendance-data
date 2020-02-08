const { authenticate } = require('@feathersjs/authentication').hooks;
const attendanceReport = require('../../hooks/attendance-report');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ attendanceReport() ],
    get: [ attendanceReport() ],
    create: [],
    update: [],
    patch: [],
    remove: []
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
