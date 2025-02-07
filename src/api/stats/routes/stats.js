module.exports = {
  async getStats(ctx) {
    try {
      ctx.send({ message: "API работает!" });
    } catch (error) {
      console.error("Ошибка в API:", error); // Логирование ошибки
      ctx.throw(500, "Ошибка сервера");
    }
  },
};