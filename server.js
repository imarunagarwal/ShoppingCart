//#region setup
const express = require('express')
const {
    db,
    User,
    Vendor,
    Product,
    Cart

} = require('./db')
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/',
    express.static(__dirname + '/public')
)
//#endregion

//#region Get All Vendor
app.get('/shopping/vendor', async (req, res) => {
    const vendor = await Vendor.findAll()
    res.send(vendor)
})
//#endregion

//#region Get All Product
app.get('/product', async (req, res) => {
    const product = await Product.findAll({
        include: Vendor
    })
    res.send(product)
})
//#endregion

//#region Add Vendor
app.post('/Vendor/addVendor', async (req, res) => {

    try {
        if (req.body.name == 'null' && req.body.email == '') {
            res.send(success = false)
        }
        const result = await Vendor.create({
            name: req.body.name,
            email: req.body.email
        })

        res.send({ success: true })
    } catch (e) {
        res.send({ success: false, err: e.message })
    }
})
//#endregion

//#region Remove Vendor
app.delete('/shopping/:id', async (req, res) => {
    try {
        if (req.params.id == null || req.params.id == "") {
            res.send(success = false, message = "No record found")
        } else {
            const vendor = await Vendor.findOne({
                where: {
                    id: req.params.id
                }
            })

            const product = await Product.destroy({
                where: {
                    vendorId: req.params.id
                }
            }
            )
            const result = await Vendor.destroy({
                where: {
                    id: req.params.id
                }

            })

            res.send(success = true)
        }
    } catch (e) {
        res.send(success = false)
    }
})
//#endregion

//#region Add Product
app.post('/Products/products', async (req, res) => {
    
    try {
        if (req.body.name == '' && req.body.price == '' && req.body.quantity == '') {
            res.send(success = false)
        }


        const result = await Product.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
        })
        const vendor = await Vendor.findOne({
            where: {
                id: req.body.vendorId
            }
        })
        vendor.addProduct(result)
        res.send({ success: true })

    } catch (e) {
        res.send({ success: false, err: e.message })
    }
})
//#endregion

//#region Remove Product
app.delete('/product/:id', async (req, res) => {
    try {

        if (req.params.id == null || req.params.id == "") {
            res.send(success = false, message = "No record found")
        } else {
            const result = await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send(success = true, message = "successfully removed...")
        }
    } catch (e) {
        res.send({ success: false, err: e.message })
    }
})
//#endregion

//#region Login 
app.post('/login', async (req, res) => {
    
    try {
        if (req.body.email == null || req.body.email == "") {
            res.send(success = false)
        }
        else {
            const user = await User.findOne(
                {
                    where: {
                        email: req.body.email
                    }
                }
            )
            
            res.send(user)
        }
    }
    catch (e) {
        res.send(success = false)
    }
})
//#endregion

//#region Add User
app.post('/Users/adduser', async (req, res) => {
    
    try {
        if (req.body.name == 'null' && req.body.email == '') {
            res.send(success = false)
        }
       
       
        const result = await User.create({
            name: req.body.name,
            email: req.body.email
        })

        res.send({ success: true })
    } catch (e) {
        res.send({ success: false, err: e.message })
    }
})
//#endregion

//#region FetchAllItems
app.get('/items/:email', async (req, res) => {
    const user = await User.findOne(
        {
            where: {
                email: req.params.email
            }
        }
    )

    const item = await Cart.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Product,
                include: [{ model: Vendor }]
            },
            {
                model: User
            }]

    })
    res.send(item)
})
//#endregion

//#region updateQuantityOfCart
app.get('/getitems/:email', async (req, res) => {
    
    try {

        (async () => {
            const item = await Cart.findAll({
                include: [
                    {
                        model: Product,
                        include: [Vendor]
                    },
                    User
                ]
            })
        })();
        const user = await User.findOne(
            {
                where: {
                    email: req.params.email
                }
            }
        )
        
        const tot = await Cart.sum('quantity',
            {
                where: {
                    userId: user.id
                }
            })
        if (tot > 0) {
            res.send({ success: true, count: tot })
        } else {
            res.send({ success: true, count: 0 })
        }

    } catch (e) {
        res.send({ success: false, error: e.message })
    }


})
//#endregion

//#region Add to Cart
app.post('/addtocart', async (req, res) => {
    try {
        
        const user = await User.findOne({
            where: {
                email: req.body.uemail
            }
        })
        const product = await Product.findOne({
            where: {
                id: parseInt(req.body.id)
            }
        })
        const cart = await Cart.findOne({
            where: {
                productId: parseInt(req.body.id),
                userId: user.id
            }
        })
        if (cart === null) {

            const result = await Cart.create({
                quantity: 1,
                total: 0
            })
            user.addCart(result)
            product.addCart(result)
            res.send({ success: true })

        } else {
            if (cart.quantity < product.quantity) {
                cart.increment({
                    quantity: 1
                })
                res.send({ success: true })
            }
            else {
                res.send({ success: false, err: "quantity exceeded..!" })
            }
        }
    } catch (e) {
        
        res.send({ success: true })
    }
})
//#endregion

//#region Subtract Quantity Of Item
app.post('/subtractqty/:id', async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            include: [
                { model: Product, include: [{ model: Vendor }] },
                {
                    model: User
                }]
        })
        if (cart.quantity - 1 > 0) {
            const updatecart = await Cart.update({
                quantity: cart.quantity - 1,
            }, {
                    where: {
                        id: cart.id
                    }
                })
            res.send({ success: true })
        } else {
            const result = await Cart.destroy({
                where: {
                    id: parseInt(req.params.id)
                }
            })
            res.send({ success: true })
        }
        res.send({ success: true })
    } catch (e) {
        
        res.send({ success: false, err: e.message })
    }
})



db.sync()
    .then(() => {
        app.listen(process.env.PORT || 7927, console.log('listening at http://localhost:7927'))
    });
