let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let sha1 = require("sha1");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/upload/" });
let reloadMagic = require("./reload-magic.js");
reloadMagic(app);
let dbo = undefined;
let url =
  "mongodb+srv://ahmed:ahmed@cluster0-hlssn.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    dbo = db.db("Market")
})
app.use('/upload', express.static("/upload"))
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
              console.log(err, "erreur find cart user");
              res.send({ success: false });
              return;
            }
            if (username) {
              //we concat an object each time the user click on add to cart
              // with categorie for property and the id of the item.
              let newItems = it.items.concat({ cat: ObjectID(item) });
              dbo.collection("cart").updateOne({ username, items: newItems });
              res.send({ success: true });
              return;
            }
          };
      }
    };
  res.send({ success: false });
  return;
});
app.get("/send-items", (req, res) => {
  dbo
    .collection("items")
    .find({})
    .toArray((err, items) => {
      if (err) {
        console.log("error", err);
        res.send({ success: false });
        return;
      }
      console.log("items", items);
      res.send(JSON.stringify(items));
    });
});
app.post("/itemSearch", upload.none(), (req, res) => {
  let name = req.body.name;
  dbo.collection("items").find({ name: name }, (err, item) => {
    if (err) {
      console.log(err, "items search error");
      res.send({ success: false });
      return;
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
                console.log("test complet")
                res.send({ success: false })
                return
            }
            if (user.password === hashedPwd) {
                console.log("test")
                res.send({ success: true })
                return
            }
        })
    }

})

// app.post('/logout')

app.post('/newItem', upload.array("files", 5), (req, res) => {
    // let seller = req.body.firstName
    let title = req.body.title
    let desc = req.body.descrpition
    let cat = req.body.categories
    let price = req.body.price
    let images = req.body.images
    let newImg = images.split(',')
    dbo.collection(cat).insertOne({ title: title, description: desc, price: price, images: newImg })
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
          });
      });
      dbo.collection;
      res.send();
      return;
    }
    res.send({ success: false })
    return
})
app.post('/send-items', upload.none(), (req, res) => {
    let collection = req.body.categorie
    console.log(collection, "test")
    dbo.collection(collection).find({}).toArray((err, items) => {
        console.log(items, 'items')
        if (err) {
            console.log("error", err)
            res.send({ success: false })
            return
        }
        res.send(JSON.stringify(items))
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

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
