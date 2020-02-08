// Application hooks that run for every service
const log = require('./hooks/log');

const findMany = require('./hooks/find-many');

module.exports = {
  before: {
    all: [ log() ],
    find: [findMany()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
