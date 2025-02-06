module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/stats',
      handler: 'stats.getStats',
      config: {
        auth: false,
      },
    },
  ],
};
