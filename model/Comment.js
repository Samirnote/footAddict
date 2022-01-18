const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	content: String,
    author: { type: Schema.Types.ObjectId, ref: "users" },
    manga: { type: Schema.Types.ObjectId, ref: "mangas" }
});

const CommentModel = mongoose.model("comments", commentSchema);

module.exports = CommentModel;

// {
//     content: String,
//     manga: {
//         type: ObjectId,
//         ref: "mangas"
//     }
// }

// {
//     content: String,
//     author: ObjectId ref "User",
//     manga: ObjectId ref: "manga,"
// }