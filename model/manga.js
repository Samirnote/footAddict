const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// structure of a manga document in the app / db
const mangaSchema = new Schema({
    name: String,
    category: ['Gekiga 劇画', 'Hentai 変態', 'Mahō shōjo 魔法少女', 'Mecha メカ', 'Nekketsu 熱血', 'Yaoi やおい', 'Yuri 百合'],
    episodeNumber: Number,
    author: { type: Schema.Types.ObjectId, ref: "users" },
    cover: String,
    description: String,
});

const MangaModel = mongoose.model("mangas", mangaSchema);

module.exports = MangaModel;
