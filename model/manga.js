const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// structure of a manga document in the app / db
const mangaSchema = new Schema({
    name: String,
    category: ['Kodomo 子供', 'Shōnen 少年', 'Shōjo 少女', 'Seinen 青年', 'Josei 女性', 'Seijin 成人', 'Yaoi やおい', 'Yuri 百合'],
    episodeNumber: Number,
    author: { type: Schema.Types.ObjectId, ref: "users" },
    cover: String,
    description: String,
});

const MangaModel = mongoose.model("mangas", mangaSchema);

module.exports = MangaModel;
