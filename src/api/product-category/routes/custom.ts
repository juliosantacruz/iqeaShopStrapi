module.exports={
  routes:[
    {
      method:'GET',
      path:'/product-category/:slug',
      handler: 'product-category.findOne',
      config:{
        auth:false,
      }
    }
  ]
}
