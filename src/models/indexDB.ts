const Sequelize = require('sequelize');
const pg = require('pg');



export let sequelize = new Sequelize("postgres://gtfytzmnsmkrln:2adc537ce7ee7eb18c03ebb7a052802c505c53b0006fee10172b1eb79258d53b@ec2-54-247-79-178.eu-west-1.compute.amazonaws.com:5432/d5a8pkldtlerj6", {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: true
    }
});


export const models = {
    Cart: sequelize.import('./cart'),
    CartProducts: sequelize.import('./cartProduct'),
    Products: sequelize.import('./products')
};




models.Cart.hasMany(models.CartProducts, { foreignKey: 'cartId', as: 'CartProducts' });
models.Products.hasMany(models.CartProducts, { foreignKey: 'productId', as: 'CartProducts' });
models.CartProducts.hasOne(models.Cart, { foreignKey: 'id', sourceKey: 'cartId', as: 'Cart' });
models.CartProducts.hasOne(models.Products, { foreignKey: 'id', sourceKey: 'productId', as: 'Product' });



sequelize.sync();

