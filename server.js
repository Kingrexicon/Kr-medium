const express = require("express");
const app = express();
const upload = require("./middleware/multer");
const cloudinary = require("./middleware/cloudinary");
// const ejs = require("ejs")
require("dotenv").config();
const PORT = process.env.PORT;
const dbConnectionStr = process.env.DB_string;
const MongoClient = require("mongodb").MongoClient;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoClient.connect(dbConnectionStr)

	.then((client) => {
		console.log("Connected to Database");
		const db = client.db("Kr_store");
		const storeCollection = db.collection("store");
		const commentCollection = db.collection("comments");
		// app.use(express.static("public"));


		app.get("/", async (req, res) => {
			try {
				const stores = await db.collection("store").find().toArray();
				const comments = await db.collection("comments").find().toArray();
				res.render("index.ejs", { store: stores, comments: comments });
			} catch (error) {
				console.error(error);
				res.status(500).send("Error fetching store items");
			}
		});

		app.get("/write", (req, res) => {
			res.sendFile(__dirname + "/public/create_product.html");
		});

		app.get("/store/:id/comments", async (req, res) => {
			try {
				const storeId = req.params.id;
				const comments = await db
					.collection("comments")
					.find({ storeId: storeId })
					.toArray();
				res.json(comments);
				res.render("index.js", {comments: comments});
			} catch (error) {
				console.error(error);
				res.status(500).send("Error fetching comments");
			}
		});

		app.post("/store", upload.single("file"), async (req, res) => {
			try {
				const picture = await cloudinary.uploader.upload(req.file.path);
				const result = await storeCollection.insertOne({
					name: req.body.name,
					image: picture.secure_url,
					cloudinaryId: picture.public_id,
					quote: req.body.quote,
				});
				console.log(result);
				res.redirect("/");
			} catch (error) {
				console.error(error);
				res.status(500).send("Error inserting item");
			}
		});

		app.post("/comment", async (req, res) => {
			try {
				const result = await commentCollection.insertOne({
					comment: req.body.comment,
					storeId: req.body.storeId,
				});
				console.log(result);
				res.redirect("/");
			} catch (error) {
				console.error(error);
				res.status(500).send("Error adding comments");
			}
		});

		app.put("/store", (req, res) => {
			storeCollection
				.findOneAndUpdate(
					{ name: "bentley" },
					{
						$set: {
							name: req.body.name,
							quote: req.body.quote,
							image: req.body.image,
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
	console.log(`listenening on port ${PORT}`);
});
