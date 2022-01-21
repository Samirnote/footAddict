const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    content: Number,
    author: { type: Schema.Types.ObjectId, ref: "users" },
    manga: { type: Schema.Types.ObjectId, ref: "mangas" }
});

const CommentModel = mongoose.model("votes", voteSchema);

module.exports = CommentModel;