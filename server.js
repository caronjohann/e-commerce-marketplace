let express = require('express')
let app = express()
let mangoClient = require("mangodb").mangoClient
let objectID = require("mangodb").ObjectID
let sha1 = require('sha1')
let multer = require('multer')
let upload = multer({ dest: __dirname + '/upload/' })
let reloadMagic = require('./reload-magic.js')
reloadMagic(app)
let dbo = undefined
let url = "mongodb+srv://ahmed:ahmed@cluster0-hlssn.mongodb.net/test?retryWrites=true&w=majority"
mangoClient.connect(url, { userNewUrlParser: true }, (err, db) => {
    dbo = db.db("Market")
})
app.use('/uploads', express.static("upload"))
app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets
// Your endpoints go after this line
app.post('/signup', upload.none(), (req, res) => {
    let username = req.body.username
    let password = req.body.password
    dbo.collection('users').findOne({ username }), (err, user) => {
        if (err) {
            console.log(err, "signup err")
            res.send(JSON.stringify({ succes: false }))
            return
        }
        if (user === username) {
            console.log("same username")
            res.send(JSON.stringify({ success: false }))
            return
        }
        else {
            dbo.collection("users").insertOne({ username, password: sha1(password) })
            res.send({ success: true })
            return
        }
    }
})
app.post('/login', upload.none(), (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let hashedPwd = sha1(password)
    dbo.collection("users").findOne({ username }), (err, user) => {
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
            res.send({ success: true })
            return
        }
        res.send({ success: false })
    }
})
app.post('/newItem', upload.fields({ name: "images", maxCount: 5 }), (req, res) => {
    let images = []
    let seller = req.body.username
    let name = req.body.itemName
    let desc = req.body.desc
    let stock = req.body.stock
    let cat = req.body.categorie
    let files = req.files
    let price = req.
        files.forEach(file => {
            let frontendPath = '/upload/' + file.filenmae
            images.push(frontendPath)
        })
    dbo.collection(cat).insertOne({ name, description: desc, seller, stock, images })
    res.send({ success: true })
})
app.post('/purchase', uplod.none(), (req, res) => {

})
// Your endpoints go before this line

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })
