/**
 * product-category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product-category.product-category',({strapi})=>({
  async findOne(ctx){
    const { id } = ctx.params;

    const entity = await strapi.db.query('api::product-category.product-category').findOne({
      where:{slug:id},
      populate:['cover', 'products', 'products.image_1','products.product_tags']
    });
    const sanatizedEntity = await this.sanitizeOutput(entity, ctx)
    return this.transformResponse(sanatizedEntity)
  }
}));
