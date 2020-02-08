// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const skater = await context.app.service('/api/v1/skaters').get(context.result.skater);
    if (!Array.isArray(skater.attendances)) {
      skater.attendances = [];
    }
    skater.attendances.push(context.result._id);
    await context.app.service('/api/v1/skaters').patch(
      context.result.skater,
      { attendances: skater.attendances }
    );

    return context;
  };
};
