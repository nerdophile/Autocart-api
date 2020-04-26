const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
import { sequelize, models } from './models/indexDB';
import products from './models/products';
const insecure = require('insecure');
const app = express();
const { Op } = require("sequelize");

insecure();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// models.CartProducts.findAll({
//     include: [{
//         model: models.Cart,
//         as: 'Cart',
//         where: {
//             barcode: '42222222'
//         }
//     }, {
//         model: models.Products,
//         as: 'Product',
//         where: {
//             barcode: '420420'
//         }
//     }]

// }).then((rows) => {
//     console.log(rows.length, 'count');
//     // console.log(rows[0].productId, rows[0].cartId);
// }).catch((error) => {
//     console.log(error);
// });



// models.Cart.findOne({
//     where: {
//         barcode: "42222222"
//     }, attributes: ['id']

// }).then((Cart) => {
//     console.log(Cart.id, 'dddd');

// }).catch((error) => {
//     console.log(error);
// });

// models.Products.findOne({
//     where: {
//         barcode: "420420"
//     }, attributes: ['id']

// }).then((Products) => {
//     console.log(Products.id, 'dddd');
// }).catch((error) => {
//     console.log(error);
// });



// models.CartProducts.destroy({
//     where: {
//         cartId: 1,
//         productId: 1
//     }
// }).then((Cart) => {
//     console.log(Cart, 'dddd');
// }).catch((error) => {
//     console.log(error);
// });

// models.CartProducts.create(
//     { createdAt: new Date().toISOString() }, {


// }).then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(error.message);
// })


app.get('/', (req, res) => {
    res.send('Server Running');
})


app.post('/addProduct', async (req, res) => {
    const { cartBarcode, productBarcode } = req.body;
    try {
        const rows = await models.CartProducts.findAll({
            include: [{
                model: models.Cart,
                as: 'Cart',
                where: {
                    barcode: cartBarcode
                }
            }, {
                model: models.Products,
                as: 'Product',
                where: {
                    barcode: productBarcode
                }
            }]

        })
        if (rows.length > 0) {
            await models.CartProducts.destroy({
                where: {
                    cartId: rows[0].cartId,
                    productId: rows[0].productId
                }
            })

            return res.status(201).json({
                message: 'Product removed from cart successfully'
            })
        } else {

            const cart = await models.Cart.findOne({
                where: {
                    barcode: cartBarcode
                }, attributes: ['id']

            })

            const product = await models.Products.findOne({
                where: {
                    barcode: productBarcode
                }, attributes: ['id']

            });

            if (!product) {
                return res.status(401).json({
                    message: "Product Barcode does not exist in db"
                })
            }

            if (!cart) {
                return res.status(401).json({
                    message: "Cart Barcode does not exist in db"
                })
            }


            const insert = await models.CartProducts.create(
                {
                    cartId: cart.id,
                    productId: product.id
                })
            return res.status(201).json({
                message: 'Product added to cart successfully'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: error.message
        })
    }

})

app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀  Server ready at 4000`);
});
