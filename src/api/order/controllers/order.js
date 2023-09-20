"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

(module.exports = createCoreController("api::order.order")),
  ({ strapi }) => ({
    async find(ctx) {
      const userId = ctx.state.user.id;
      const entries = await strapi.db.query("api::order.order").findMany({
        where: { users_permissions_user: userId },
      });
      console.log(entries);

      return { data: entries };
    },
    async create(ctx) {
      ctx.request.body.data.users_permissions_user = ctx.state.user.id;
      let entity = await strapi
        .service("api::order.order")
        .create(ctx.request.body);
      return entity;
    },
  });
