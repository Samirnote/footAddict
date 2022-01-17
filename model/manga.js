const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// // planing how the hacker document should like like, before database insertion
const mangaSchema = new Schema({
	name: String,
	category : String,
    epsNumb : number,
    picture :String
});

const MangaModel = mongoose.model("users", mangaSchema);

module.exports = MangaModel;
