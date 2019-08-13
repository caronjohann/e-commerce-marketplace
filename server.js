let express = require('express')
let app = express()
let MongoClient = require("mongodb").MongoClient
let ObjectID = require("mongodb").ObjectID
let sha1 = require('sha1')
let multer = require('multer')
let upload = multer({ dest: __dirname + '/upload/' })
let reloadMagic = require('./reload-magic.js')
reloadMagic(app)
let dbo = undefined
let url = "mongodb+srv://ahmed:ahmed@cluster0-hlssn.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    dbo = db.db("Market")
})
app.use('/uploads', express.static("upload"))
app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

app.post('/signup', upload.none(), (req, res) => {
    let username = req.body.username
    let fName = req.body.firstName
    let lName = req.body.lastName
    let password = req.body.password
    console.log(req.body, "body")
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
                console.log("test")
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
    console.log(hashedPwd, "body")
    if (username !== "" && password !== "") {
        dbo.collection("users").findOne({ username: username }, (err, user) => {
            if (err) {
                console.log(err, "login error")
                res.send({ success: false })
                return
            }
            if (user === null) {
                console.log("test")
                res.send({ success: false })
                return
            }
            if (user.password === hashedPwd) {
                console.log("test")
                res.send({ success: true })
                return
            }
            res.send({ success: false })
        })
    }

})
app.post('/newItem', upload.array({ name: "images", maxCount: 5 }), (req, res) => {
    let images = []
    let seller = req.body.firstName
    let name = req.body.title
    let desc = req.body.descrpition
    let cat = req.body.categeries
    let files = req.files
    let price = req.body.price
    console.log(req.body, "body")
    files.forEach(file => {
        // Each image path was send in the images array
        let frontendPath = '/upload/' + file.filenmae
        images.push(frontendPath)
    })
    dbo.collection(cat).insertOne({ name, description: desc, seller, images, price })
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
app.post('/itemSearch', upload.none(), (req, res) => {
    let name = req.body.name
    dbo.collection().find({ name: name }, (err, item) => {
        if (err) {
            console.log(err, "items search error")
            res.send({ success: false })
            return
        }
        if (name === null) {
            console.log("test")
            res.send({ success: false })
            return
        } else {
            console.log("result item search")
            res.send(item)
        }
    })
})
app.post('/checkout', upload.none(), (req, res) => {
    let username = req.body.username
    dbo.collection('cart').findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err, "cart error")
            res.send({ success: false })
            return
        }
        if (username) {
            let items = []
            user.items.forEach(it => {
                let categorie = Object.keys(it)
                let id = Object.values(it)
                dbo.collection(categorie).findOne({ _id: ObjectID(id) }, (err, item) => {
                    if (err) {
                        console.log(err, "cart find item error")
                        res.send({ success: false })
                    }
                    if (_id === null) {
                        console.log("test")
                        res.send({ success: false })
                        return
                    } else {
                        res.send(item)
                    }
                })
            })
            dbo.collection
            res.send()
            return
        }
    })
    console.log("username not find")
    res.send({ success: false })
    return
})
// app.post('sellerItemsList')

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })
