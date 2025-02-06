const { sanitize } = require('@strapi/utils');

module.exports = {
  async getStats(ctx) {
    const orders = await strapi.entityService.findMany('api::order.order');
    const users = await strapi.entityService.findMany('plugin::users-permissions.user');
    const sellers = await strapi.entityService.findMany('api::seller.seller');

    // Подсчёт статистики
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const totalSellers = sellers.length;

    // Фильтрация по дате
    const now = new Date();
    const ordersToday = orders.filter(order => new Date(order.createdAt).toDateString() === now.toDateString()).length;
    const ordersWeek = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return orderDate >= weekAgo && orderDate <= now;
    }).length;
    const ordersMonth = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    }).length;

    // Аналогично для пользователей
    const newUsersToday = users.filter(user => new Date(user.createdAt).toDateString() === now.toDateString()).length;
    const newUsersWeek = users.filter(user => {
      const userDate = new Date(user.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return userDate >= weekAgo && userDate <= now;
    }).length;
    const newUsersMonth = users.filter(user => {
      const userDate = new Date(user.createdAt);
      return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
    }).length;

    // Онлайн продавцы (предполагается, что есть поле isOnline)
    const onlineSellers = sellers.filter(seller => seller.isOnline).length;

    ctx.send({
      totalOrders,
      ordersToday,
      ordersWeek,
      ordersMonth,
      totalUsers,
      newUsersToday,
      newUsersWeek,
      newUsersMonth,
      totalSellers,
      onlineSellers,
    });
  },
};
