let express = require('express')
let app = express()
let MongoClient = require("mongodb").MongoClient
let ObjectID = require("mongodb").ObjectID
let sha1 = require('sha1')
let multer = require('multer')
let upload = multer({ dest: __dirname + '/upload/' })
let reloadMagic = require('./reload-magic.js')
let cookieParser = require('cookie-parser')
reloadMagic(app)
let dbo = undefined
let url = "mongodb+srv://ahmed:ahmed@cluster0-hlssn.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    dbo = db.db("Market")
})
let sessions = {}
app.use(cookieParser())
app.use('/upload', express.static("upload"))
app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

app.post('/signup', upload.none(), (req, res) => {
    let username = req.body.username
    let fName = req.body.firstName
    let lName = req.body.lastName
    let password = req.body.password

    if (username !== "" && password !== "") {
        dbo.collection('users').findOne({ username: username }, (err, user) => {
            console.log(user, "user")
            if (err) {
                console.log(err, "signup err")
                res.send(JSON.stringify({ succes: false }))
                return
            }
            if (user !== null) {
                console.log("same username")
                res.send(JSON.stringify({ success: false }))
                return
            } else {
                //this is for create the user & the cart in the backend
                dbo.collection('cart').insertOne({ username, items: [] })
                dbo.collection("users").insertOne({ username, password: sha1(password), fName, lName })
                res.send({ success: true })
                return
            }
        })
    }

})

app.post('/login', upload.none(), (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let hashedPwd = sha1(password)
    if (username !== "" && password !== "") {
        dbo.collection("users").findOne({ username: username }, (err, user) => {
            if (err) {
                console.log(err, "login error")
                res.send({ success: false })
                return
            }
            if (user === null) {
                res.send({ success: false })
                return
            }
            if (user.password === hashedPwd) {
                let sid = Math.floor(Math.random() * 10000000)
                sessions[sid] = username
                res.cookie('sid', sid)
                res.send({ success: true, username: username, sid: sid })
                return
            }
        })
    }

})

app.get('/logout', (req, res) => {
    let sessionId = req.cookies.sid
    delete sessions[sessionId]
})

app.post('/newItem', upload.array("files", 5), (req, res) => {
    // let seller = req.body.firstName
    let title = req.body.title
    let desc = req.body.descrpition
    let cat = req.body.categories
    let price = req.body.price
    let images = req.body.images
    let newImg = images.split(',')
    dbo.collection('items').insertOne({ title: title, description: desc, price: price, images: newImg, cat })
    res.send({ success: true })
})

app.post('/addTocart', upload.none(), (req, res) => {
    let username = req.body.username
    let item = req.body.id
    let cat = req.body.cat
    dbo.collection(cat).findOne({ "_id": item }), (err, it) => {
        //this is for find the id of the item for stack it in the cart 
        // collection with the username
        if (err) {
            console.log(err, "add to cart error")
            res.send({ success: false })
        }
        if (it._id === item) {
            dbo.collection('cart').findOne({ username }), (err, user) => {
                //this is for find the good cart for stack the items inside of them.
                if (err) {
                    console.log(err, "erreur find cart user")
                    res.send({ success: false })
                    return
                }
                if (username) {
                    //we concat an object each time the user click on add to cart
                    // with categorie for property and the id of the item.
                    let newItems = it.items.concat({ cat: ObjectID(item) })
                    dbo.collection('cart').updateOne({ username, items: newItems })
                    res.send({ success: true })
                    return
                }
            }
        }

    }
    res.send({ success: false })
    return
})
app.get('/send-items', (req, res) => {
    dbo.collection('items').find({}).toArray((err, items) => {
        if (err) {
            console.log("error", err)
            res.send({ success: false })
            return
        }
        res.send(JSON.stringify(items))
    })
})
app.get('/user-cart', (req, res) => {
    let sessionId = req.cookies.sid
    res.send({ user: sessions[sessionId] })
})
app.post('/checkout', upload.none(), (req, res) => {
    let sessionId = req.cookies.sid
    let username = sessions[sessionId]
    dbo.collection('cart').findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err, "cart error")
            res.send({ success: false })
            return
        }
        if (username) {
            let items = []
            user.items.forEach(it => {
                items.push(it)
            })
            res.send(JSON.stringify(items))
            return
        }
        console.log("username not find")
        res.send({ success: false })
        return
    })

})
app.post('/deleteItemCart', upload.none(), (req, res) => {
    let id = req.body.id
    let username = req.body.username
    console.log(username)
    dbo.collection('cart').findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err, "cart error")
            res.send({ success: false })
            return
        }
        if (username) {
            let newCart = user.items.filter(item => {
                return (
                    item !== id
                )

            })
            let cartId = user._id
            dbo.collection('cart').updateOne({ "_id": ObjectID(cartId) }, { $set: { items: newCart } })
            res.send({ success: true })
            return
        }
        console.log("username not find")
        res.send({ success: false })
        return
    })
})
// app.post('sellerItemsList')

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })
