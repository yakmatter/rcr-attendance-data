const FIND_MANY_KEYS = ['_id'];

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const query = context.params.query;
    let promises = [];
    FIND_MANY_KEYS.forEach(key => {
      if (query && query[key] && Array.isArray(query[key])) {
        query[key].forEach(queryKey => {
          promises.push(context.app.service(context.path).get(queryKey));
        });
      }
    });
    if (promises.length > 0) {
      const data = await Promise.all(promises);

      // eslint-disable-next-line require-atomic-updates
      context.result = { data };
      return context;
    }
    return context;
  };
};
