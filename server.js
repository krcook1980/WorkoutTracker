const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGDB_URI || "mongodb://localhost/workoutTracker", {
    useNewUrlParser: true
});

app.use(require("./routes/api-routes"))

app.listen(PORT, () => {
    console.log(`App running on port https://localhost.8080`)
})