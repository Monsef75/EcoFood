const { ObjectId } = require('mongodb')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { error } = require('console')
const upload = multer({ dest: 'uploads/' })
const secKey = process.env.SEC_KEY
const refSecKey = process.env.REFRESH_SEC_KEY
const verifyToken = require('./middlewares/verifyToken.js')

module.exports = (app, members, products, orders) => {

    app.post('/signUp', async (req, res) => {
        try {
            if (!req.body.user) {
                return res.status(400).send(['User data is required'])
            }

            const { fullName, email, password, createdAt } = JSON.parse(req.body.user)

            if (!fullName || !email || !password) {
                return res.status(400).send(['Missing required sign up fields'])
            }

            const isEmailExist = await members.findOne({ email: email.toLowerCase() })

            if (isEmailExist) {
                return res.status(409).send(['Email already exist'])
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            let user = {
                fullName: fullName,
                email: email.toLowerCase(),
                password: hashedPassword,
                role: 'customer',
                createdAt: createdAt,
                favorites: [],
                purchases: [],
                productsNbr: 0,
            }

            const result = await members.insertOne(user)

            const jwtUser = {
                id: result.insertedId,
                fullName: user.fullName,
                email: user.email,
                role: 'customer',
            }

            const token = jwt.sign(jwtUser, secKey, { expiresIn: '2h' })
            const refToken = jwt.sign(jwtUser, refSecKey, { expiresIn: '14d' })

            res.send({ token, refToken, user: jwtUser })
        } catch (err) {
            res.status(500).send(['Failed to sign up'])
        }
    })
    app.get('/signIn', async (req, res) => {
        try {
            const { email, password } = req.query

            if (!email || !password) {
                return res.status(400).send(['Email and password are required'])
            }

            const user = await members.findOne({ email: email.toLowerCase() })

            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password)

                if (isPasswordValid) {
                    const dbUser = {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        role: 'customer',
                    }

                    const token = jwt.sign(dbUser, secKey, { expiresIn: '2h' })
                    const refToken = jwt.sign(dbUser, refSecKey, { expiresIn: '14d' })

                    res.send({ token, refToken, user: dbUser })
                } else {
                    res.status(401).send([null, 'Password is incorrect'])
                }
            } else {
                res.status(401).send(['Email is incorrect', null])
            }
        } catch (err) {
            res.status(500).send(['Failed to sign in'])
        }
    })

    app.post('/addProduct', upload.single('img'), async (req, res) => {
        try {
            if (!req.body.product) {
                return res.status(400).send({ message: 'Product data is required' })
            }

            if (!req.file) {
                return res.status(400).send({ message: 'Product image is required' })
            }

            const { info, addedBy, createdAt, duration } = JSON.parse(req.body.product)
            const duration_ = Number(duration)

            if (!addedBy?.id) {
                return res.status(400).send({ message: 'Invalid user data' })
            }

            if (Number.isNaN(duration_) || duration_ <= 0) {
                return res.status(400).send({ message: 'Invalid product duration' })
            }

            const now = new Date()
            const expiresAt = new Date(now.getTime() + duration_ * 24 * 60 * 60 * 1000)

            // for test 1 minute use this instead:
            // const expiresAt = new Date(now.getTime() + 1 * 60 * 1000)

            const product = {
                info: info,
                addedBy: addedBy,
                createdAt: createdAt,
                expiresAt: expiresAt,
                image: `/uploads/${req.file.filename}`,
            }

            const result = await products.insertOne(product)
            await members.updateOne(
                { _id: new ObjectId(addedBy.id) },
                { $inc: { productsNbr: 1 } }
            )

            res.send(result)
        } catch (err) {
            console.log('addProduct failed', err)
            res.status(500).send({ message: 'Failed to add product' })
        }
    })
    app.get('/getProducts', async (req, res) => {
        try {
            const Products = await products.find().toArray()
            res.send(Products)
        } catch (err) {
            console.log('getProducts failed', err)
            res.status(500).send({ message: 'Failed to get products' })
        }
    })

    app.post('/addFavorite', async (req, res) => {
        try {
            const { productId, userId } = req.body

            if (!productId || !userId) {
                return res.status(400).send({ message: 'productId and userId are required' })
            }

            const user = await members.findOne({ _id: new ObjectId(userId) })

            if (!user) {
                return res.status(404).send({ message: 'User not found' })
            }

            if (user.favorites.includes(productId)) {
                return res.send({ message: 'Already In Favorites' })
            }

            const result = await members.updateOne(
                { _id: new ObjectId(userId) },
                { $addToSet: { favorites: productId } }
            )

            res.send({ message: 'Added To Favorites Successfully', result })
        } catch (err) {
            console.log('addFavorite failed', err)
            res.status(500).send({ message: 'Failed to add favorite' })
        }
    })
    app.get('/getFavorites', async (req, res) => {
        try {
            const { userId } = req.query

            if (!userId) {
                return res.status(400).send({ message: 'userId is required' })
            }

            const user = await members.findOne({ _id: new ObjectId(userId) })

            if (!user) {
                return res.status(404).send({ message: 'User not found' })
            }

            const favoritesIds = user.favorites.map(id => new ObjectId(id))
            const favorites = await products.find({ _id: { $in: favoritesIds } }).toArray()

            res.send(favorites)
        } catch (err) {
            console.log('getFavorites failed', err)
            res.status(500).send({ message: 'Failed to get favorites' })
        }
    })
    app.delete('/deleteFavorite', async (req, res) => {
        try {
            const { productId, userId } = req.body

            if (!productId || !userId) {
                return res.status(400).send({ message: 'productId and userId are required' })
            }

            const result = await members.updateOne(
                { _id: new ObjectId(userId) },
                { $pull: { favorites: productId } }
            )

            res.send(result)
        } catch (err) {
            console.log('deleteFavorite failed', err)
            res.status(500).send({ message: 'Failed to delete favorite' })
        }
    })

    app.post('/addPurchase', async (req, res) => {
        try {
            const { productId, userId } = req.body

            if (!productId || !userId) {
                return res.status(400).send({ message: 'productId and userId are required' })
            }

            const user = await members.findOne({ _id: new ObjectId(userId) })

            if (!user) {
                return res.status(404).send({ message: 'User not found' })
            }

            if (user.purchases.includes(productId)) {
                return res.send({ message: 'Already In Cart' })
            }

            const result = await members.updateOne(
                { _id: new ObjectId(userId) },
                { $addToSet: { purchases: productId } }
            )

            res.send({ message: 'Added To Cart Successfully', result })
        } catch (err) {
            console.log('addPurchase failed', err)
            res.status(500).send({ message: 'Failed to add purchase' })
        }
    })
    app.get('/getPurchases', async (req, res) => {
        try {
            const { userId } = req.query

            if (!userId) {
                return res.status(400).send({ message: 'userId is required' })
            }

            const user = await members.findOne({ _id: new ObjectId(userId) })

            if (!user) {
                return res.status(404).send({ message: 'User not found' })
            }

            const purchasesIds = user.purchases.map(id => new ObjectId(id))
            const purchases = await products.find({ _id: { $in: purchasesIds } }).toArray()

            res.send(purchases)
        } catch (err) {
            console.log('getPurchases failed', err)
            res.status(500).send({ message: 'Failed to get purchases' })
        }
    })
    app.delete('/deletePurchase', async (req, res) => {
        try {
            const { productId, userId } = req.body

            if (!productId || !userId) {
                return res.status(400).send({ message: 'productId and userId are required' })
            }

            const result = await members.updateOne(
                { _id: new ObjectId(userId) },
                { $pull: { purchases: productId } }
            )

            res.send(result)
        } catch (err) {
            console.log('deletePurchase failed', err)
            res.status(500).send({ message: 'Failed to delete purchase' })
        }
    })

    app.post('/addOrder', async (req, res) => {
        try {
            const { userId, order } = req.body

            if (!userId || !order) {
                return res.status(400).send({ message: 'userId and order are required' })
            }

            const insertOrder = await orders.insertOne(order)
            const update = await members.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { purchases: [] } }
            )

            res.send({ insertOrder, update })
        } catch (err) {
            console.log('addOrder failed', err)
            res.status(500).send({ message: 'Failed to add order' })
        }
    })
    app.get('/getOrders', async (req, res) => {
        try {
            const { userId } = req.query

            if (!userId) {
                return res.status(400).send({ message: 'userId is required' })
            }

            const ordersList = await orders.find({
                "products.addedBy": userId
            }).toArray()

            const productIds = [
                ...new Set(
                    ordersList.flatMap(o =>
                        o.products
                            .filter(p => p.addedBy === userId)
                            .map(p => p.productId)
                    )
                )
            ].map(id => new ObjectId(id))

            const productsList = await products.find({
                _id: { $in: productIds }
            }).toArray()

            const map = Object.fromEntries(
                productsList.map(p => [p._id.toString(), p])
            )

            const result = ordersList.map(o => ({
                _id: o._id,
                buyerInfo: o.buyerInfo,
                createdAt: o.createdAt,
                products: o.products
                    .filter(p => p.addedBy === userId)
                    .map(p => map[p.productId])
            }))

            res.send(result)
        } catch (err) {
            console.log('getOrders failed', err)
            res.status(500).send({ message: 'Failed to get orders' })
        }
    })
    app.delete('/deleteOrder', async (req, res) => {
        try {
            const { id } = req.body

            if (!id) {
                return res.status(400).send({ message: 'Order id is required' })
            }

            const deleteOrder = await orders.deleteOne({ _id: new ObjectId(id) })
            res.send(deleteOrder)
        } catch (err) {
            console.log('deleteOrder failed', err)
            res.status(500).send({ message: 'Failed to delete order' })
        }
    })
    
    app.get('/adminPanel/getProducts', async (req, res) => {
        try {
            const productsNbr = await products.countDocuments()
            const collection = await products.find().toArray()

            const Products = collection.map(product => {
                let name
                product.info.name.length > 18
                    ? name = product.info.name.toString().slice(0, 18) + '...'
                    : name = product.info.name

                return {
                    id: product._id,
                    image: product.image,
                    name: name,
                    category: product.info.category,
                    price: product.info.price,
                    addedBy: product.addedBy.fullName,
                    createdAt: product.createdAt,
                }
            })

            res.send({ products: Products, productsNbr })
        } catch (err) {
            console.log('adminPanel/getProducts failed', err)
            res.status(500).send({ message: 'Failed to get admin products' })
        }
    })
    app.delete('/adminPanel/deleteProduct', async (req, res) => {
        try {
            if (!req.body.id) {
                return res.status(400).send({ message: 'Product id is required' })
            }

            const deleteProduct = await products.deleteOne({ _id: new ObjectId(req.body.id) })
            res.send(deleteProduct)
        } catch (err) {
            console.log('adminPanel/deleteProduct failed', err)
            res.status(500).send({ message: 'Failed to delete product' })
        }
    })

    app.get('/adminPanel/setUsers', async (req, res) => {
        try {
            const usersNbr = await members.countDocuments()
            const collection = await members.find().toArray()

            const users = collection.map(user => {
                return {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    productsNbr: user.productsNbr,
                    createdAt: user.createdAt,
                }
            })

            res.send({ users, usersNbr })
        } catch (err) {
            console.log('adminPanel/setUsers failed', err)
            res.status(500).send({ message: 'Failed to get users' })
        }
    })
    app.delete('/adminPanel/deleteUser', async (req, res) => {
        try {
            if (!req.body.id) {
                return res.status(400).send({ message: 'User id is required' })
            }

            const deleteUser = await members.deleteOne({ _id: new ObjectId(req.body.id) })
            res.send(deleteUser)
        } catch (err) {
            console.log('adminPanel/deleteUser failed', err)
            res.status(500).send({ message: 'Failed to delete user' })
        }
    })
}
