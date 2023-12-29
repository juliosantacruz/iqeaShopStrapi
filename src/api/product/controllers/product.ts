"use strict";
const stripe = require("stripe")(process.env.STRIPE_SK);
/**
 * product controller
 */

import { factories } from "@strapi/strapi";


const precioCentavos =(precio:number)=>{
  const precioFinal = Math.floor(precio *100)
  return precioFinal
}


export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async findOne(ctx){
      const { id } = ctx.params;

      const entity = await strapi.db.query('api::product.product').findOne({
        where:{slug:id},
        populate:['image_1', 'image_2', 'product_categories','product_tags']
      });
      const sanatizedEntity = await this.sanitizeOutput(entity, ctx)
      return this.transformResponse(sanatizedEntity)
    },
    async create(ctx) {
      const { title, slug, description,unit, price:productPrice, inventario, isNew, isFeatured, product_categories } = ctx.request.body;



      console.log('context',ctx.request.body)
      try {
        const product = await stripe.products.create({
          name: title,
          description: description,
        });


        await stripe.prices.create({
          currency: 'MXN',
          unit_amount: precioCentavos(productPrice),

          product: product.id
          ,
        });

        const strapiProduct = await strapi.service("api::product.product").create({
          data:{
            stripe_product_id:product.id,
            title: title,
            slug: slug,
            description: description ,
            unit: unit,
            price: productPrice,
            inventario: inventario,
            isNew: isNew,
            isFeatured: isFeatured,

          }
        })
        return {"stripe_product":product, "strapi_product":strapiProduct}
      } catch (error) {
        throw error;
      }
    },
  })
);
