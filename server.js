const express = require("express");
const app = express();
// const ejs = require("ejs")
PORT = 4000;
const MongoClient = require("mongodb").MongoClient;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoClient.connect(
	"mongodb+srv://oyedeleoreofe:YCeERWv2mqxv5F3u@cluster0.ant5qsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
		app.post("/store", (req, res) => {
			storeCollection
				.insertOne(req.body)
				.then((result) => {
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
