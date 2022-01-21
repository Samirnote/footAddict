const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Manga = require("../model/Manga");
const Comment = require("../model/Comment");
const protectRoute = require("../middlewares/protectRoute");
const uploader = require("../config/cloudinary");

router.get("/mangas", protectRoute, (req, res, next) => {
  Manga.find()
    .populate("author")
    .then((dbMangas) => {
      console.log("all mangas found in the databases :", dbMangas);
      res.render("mangas/list", { mangas: dbMangas });
    })
    .catch((err) => {
      console.error(
        "there was an error while getting the mangas list from the database",
        err
      );
      next(err);
    });
});

router.get("/mangas/:id", protectRoute, async (req, res) => {
  try {
    const detail = await Manga.findById(req.params.id).populate("author");
    const comments = await Comment.find({ manga: req.params.id }).populate("author");
    res.render("mangas/details.hbs", { manga: detail, comments: comments });
  } catch (er) {
    console.error(er);
  }
});

router.post("/mangas/:id", async (req, res) => {
  const newComment = {
    ...req.body,
    author: req.session.currentUser._id,
    manga: req.params.id,
  };
  try {
    await Comment.create(newComment);
    req.flash("success", "Your Comment have successfully been posted !");
    res.redirect("/mangas/" + req.params.id);
  } catch (error) {
    req.flash("there was an error during the saving of your comment");
    console.error(error);
  }
});

router.get(
  "/mangas/:idManga/comment/:idComment/delete",
  protectRoute,
  async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.idComment);
      res.redirect(`/mangas/${req.params.idManga}`);
    } catch (er) {
      console.error(er);
    }
  }
);

router.get(
  "/mangas/:idManga/comment/:idComment/update",
  protectRoute,
  async (req, res) => {
    try {
      const commentToUpdate = await Comment.findById(req.params.idComment);
      res.render("mangas/updatComment.hbs", { commentToUpdate });
    } catch (er) {
      console.error(er);
    }
  }
);

router.post(
  "/mangas/:idManga/comment/:idComment/update",
  protectRoute,
  async (req, res) => {
    try {
      await Comment.findByIdAndUpdate(req.params.idComment, req.body, {
        new: true,
      });
      req.flash("success", "Your Manga have been successfully updated !");
      res.redirect(`/mangas/${req.params.idManga}`);
    } catch (er) {
      console.error(er);
    }
  }
);

module.exports = router;
