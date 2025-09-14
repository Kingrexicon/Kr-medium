const express = require("express");
const app = express();
const multer = require('multer');
// const ejs = require("ejs")
 require('dotenv').config();
const PORT = process.env.PORT
const dbConnectionStr = process.env.DB_string
const MongoClient = require("mongodb").MongoClient;




const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/'); // Images will be saved in public/uploads/
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname); // Unique filename
        }
    });

    const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoClient.connect(
	dbConnectionStr,
)

	.then((client) => {
		console.log("Connected to Database");
		const db = client.db("Kr_store");
		const storeCollection = db.collection("store");

		// app.use(express.static("public"));
		app.get("/", (req, res) => {
			db.collection("store")
				.find()
				.toArray()
				.then((results) => {
					res.render("index.ejs", { store: results });
				})
				.catch((error) => console.error(error));
		});

		app.get("/cart", (req, res) => {
			res.sendFile(__dirname + "/public/create_product.html");
		});
		app.post("/store", upload.single("image"), (req, res) => {
			storeCollection
				.insertOne(req.body)
				.then((result) => {
				

					console.log(result)
					res.redirect("/");
				})
				.catch((error) => console.error(error));
		});

		app.put("/store", (req, res) => {
			storeCollection
				.findOneAndUpdate(
					{ name: "bentley" },
					{
						$set: {
							name: req.body.name,
							quote: req.body.quote,
							image:req.body.image,
						},
					},
					{
						upsert: true,
					}
				)
				.then((result) => {
					res.json("success");
				})
				.catch((error) => console.error(error));
		});

		app.delete("/store", (req, res) => {
			storeCollection
				.deleteOne(/* ... */)
				.then((result) => {
					if (result.deletedCount === 0) {
						return res.json("No quote to delete");
					}
					res.json(`Deleted Darth Vader's quote`);
				})
				.catch((error) => console.error(error));
		});
	})
	.catch((error) => console.error(error));

// app.post("/quotes", (req, res) => {
// 	console.log(req.body);
// });

app.listen(PORT, function () {
	console.log("listenening on port 4000");
});
