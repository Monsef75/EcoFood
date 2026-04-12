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
// const ndmailer = require('./services/nodemailer.js')

module.exports = (app, members, products, orders) => {

    app.get('/rout', verifyToken, upload.array('Images', 1), async (req, res) => {

    })
    // app.get('/signUpAuth', async (req, res) => {
    //     console.log()
    //     const { email } = req.query
    //     , isEmailExist = await members.findOne( { 'email': email.toLowerCase() } )
    //     if (isEmailExist) res.status(409).send([ 'Email already exist' ])
    //     else res.send()
    // })
    app.post('/signUp', async (req, res) => {
        const { fullName, email, password, createdAt, } = JSON.parse(req.body.user)
        , isEmailExist = await members.findOne( { 'email': email.toLowerCase() } )
        if (isEmailExist) res.status(409).send([ 'Email already exist' ])
        else {
        
            const hashedPassword = await bcrypt.hash( password,10 )

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

            // if ( clientType == 'customer' ) {
            //     user = {
            //         ...user,
            //         favorites: [],
            //         orders: [],
            //     }
            // }
            // else if ( clientType == 'delivrey' ) {
            //     user = {
            //         ...user,
            //         idCard: { fileType: req.files[0].mimetype, data: fs.readFileSync(req.files[0].path) },
            //         grsCard: { fileType: req.files[1].mimetype, data: fs.readFileSync(req.files[1].path) },
            //     }
            //     req.files.forEach( file => fs.unlinkSync(file.path) )
            // }
            
            const result = await members.insertOne( user )
            , jwtUser = { 
                id: result.insertedId,
                fullName: user.fullName,
                email: user.email,
                role: 'customer',
            }
            
            , token = jwt.sign( jwtUser, secKey, { expiresIn: '2h' })
            , refToken = jwt.sign( jwtUser, refSecKey, { expiresIn: '14d' })
            res.send({ token, refToken, user: jwtUser })
        }

    })
    app.get('/signIn', async (req, res) => {
        const { email, password } = req.query
        , user = await members.findOne({ 'email': email.toLowerCase() })
        if ( user ) {
            const isPasswordValid = await bcrypt.compare( password,user.password )
            if (isPasswordValid) {
                const dbUser = { 
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: 'customer',
                }
                , token = jwt.sign( dbUser, secKey, { expiresIn: '2h' })
                , refToken = jwt.sign( dbUser, refSecKey, { expiresIn: '14d' })
                res.send({ token, refToken, user: dbUser })
            }
            else res.status(401).send([ null, 'Password is incorrect' ])
        } else res.status(401).send([ 'Email is incorrect', null ])
    })
    
    app.post('/addProduct', upload.single('img'), async (req, res) => {
        const { info, addedBy, createdAt, } = JSON.parse(req.body.product)
        , product = {
            info: info,
            addedBy: addedBy,
            createdAt: createdAt,
            image: `/uploads/${req.file.filename}`,
        }
        const result = await products.insertOne( product )
        await members.updateOne({ _id: new ObjectId(addedBy.id) }, { $inc: { productsNbr: 1 } });            
        res.send( result )
    })
    app.get('/getProducts', async (req, res) => {
        const Products = await products.find().toArray()
        res.send( Products )
    })

    app.post('/addFavorite', async (req, res) => {
        const { productId, userId, } = req.body
        , user = await members.findOne({ _id: new ObjectId(userId) })

        if (user.favorites.includes(productId)) {
            return res.send({ message: 'Already In Favorites' })
        }

        const result = await members.updateOne({ _id: new ObjectId(userId) }, { $addToSet: { favorites: productId } } )
        res.send({ message: 'Added To Favorites Successfully', result })
    })
    app.get('/getFavorites', async (req, res) => {
        const { userId, } = req.query
        , user = await members.findOne({ _id: new ObjectId(userId) })
        , favoritesIds = user.favorites.map( id => new ObjectId(id) )
        , favorites = await products.find({ _id: { $in: favoritesIds } }).toArray()
        res.send( favorites )
    })
    app.delete('/deleteFavorite', async (req, res) => {
        const { productId, userId, } = req.body
        , result = await members.updateOne({ _id: new ObjectId(userId) }, { $pull: { favorites: productId } } )
        res.send(result)
    })

    app.post('/addPurchase', async (req, res) => {
        const { productId, userId, } = req.body
        , user = await members.findOne({ _id: new ObjectId(userId) })

        if (user.purchases.includes(productId)) {
            return res.send({ message: 'Already In Cart' })
        }

        const result = await members.updateOne({ _id: new ObjectId(userId) }, { $addToSet: { purchases: productId } } )
        res.send({ message: 'Added To Cart Successfully', result })
    })
    app.get('/getPurchases', async (req, res) => {
        const { userId, } = req.query
        , user = await members.findOne({ _id: new ObjectId(userId) })
        , purchasesIds = user.purchases.map( id => new ObjectId(id) )
        , purchases = await products.find({ _id: { $in: purchasesIds } }).toArray()
        res.send( purchases )
    })
    app.delete('/deletePurchase', async (req, res) => {
        const { productId, userId, } = req.body
        , result = await members.updateOne({ _id: new ObjectId(userId) }, { $pull: { purchases: productId } } )
        res.send(result)
    })
    
    app.post('/addOrder', async (req, res) => {
        const { userId, order } = req.body

		, insertOrder = await orders.insertOne(order)
		, update = await members.updateOne({ _id: new ObjectId(userId) }, { $set: { purchases: [] }})
			
		res.send({ insertOrder, update})
    })
    app.get('/getOrders', async (req, res) => {
        const { userId, } = req.query

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
                .map(p => (map[p.productId]))
        }))

        res.send(result)
    })
    app.delete('/deleteOrder', async (req, res) => {
        const { id, } = req.body
        , deleteOrder = await orders.deleteOne({ '_id': new ObjectId(id) })
        res.send(deleteOrder)
    })

    app.get('/adminPanel/getProducts' , async (req, res) => {  
        const productsNbr = await products.countDocuments()
        const collection = await products.find().toArray()

        , Products = collection.map( product  => {
            let name 
            product.info.name.length > 18 ? name = product.info.name.toString().slice(0,18) + '...'
            : name = product.info.name
            return {
                id        : product._id,
                image     : product.image,
                name      : name,
                category  : product.info.category,
                price     : product.info.price,
                addedBy   : product.addedBy.fullName,
                createdAt : product.createdAt,
            }
        })
        res.send({ products: Products, productsNbr})
    })
    app.delete('/adminPanel/deleteProduct', async (req, res) => {
        const deleteProduct = await products.deleteOne( {'_id': new ObjectId(req.body.id) })
        res.send(deleteProduct)
    })

    app.get('/adminPanel/setUsers', async (req, res) => {
        const usersNbr = await members.countDocuments()
        , collection = await members.find().toArray()
        , users = collection.map( user => {
            return {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                productsNbr: user.productsNbr,
                createdAt: user.createdAt,
            }
        })

        res.send({ users, usersNbr })
    })
    app.delete('/adminPanel/deleteUser', async(req, res) => {
        const deleteUser = await members.deleteOne( {'_id': new ObjectId(req.body.id)})
        res.send( deleteUser )
    })
}