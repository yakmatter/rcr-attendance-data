// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const permissions = context.result.permissions || [];
    context.result.isAdmin = permissions.includes('admin');
    context.result.isKiosk = permissions.includes('kiosk');
    return context;
  };
};
