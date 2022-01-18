const express = require("express");
const router = express.Router();
//const User = require("../model/User");
const Manga = require("../model/Manga");
const Comment = require('../model/Comment');
const protectRoute = require('../middlewares/protectRoute');
const uploader = require("../config/cloudinary");


router.get('/mangas', protectRoute, (req, res, next) => {
  Manga.find()
  .populate("author")
  .then(dbMangas => {
    console.log('all mangas found in the databases :', dbMangas)
    res.render('mangas/list', { mangas: dbMangas });
  })
  .catch(err => {
    console.error('there was an error while getting the mangas list from the database', err);
    next(err);
  })
})

router.get("/mangas/:id", protectRoute, async (req, res) => {
  try{
    const detail = await Manga.findById(req.params.id)
    const comments = await Comment.find({manga: req.params.id}).populate('author')
    res.render("mangas/details.hbs", {manga : detail, comments: comments})
  }catch (er){
    console.error(er);
  }
});


router.post('/mangas/:id', async (req, res) => {
  const newComment = {...req.body, author: req.session.currentUser._id, manga: req.params.id}
    try {
        await Comment.create(newComment);
        res.redirect('/mangas/' + req.params.id)
    } catch (error) {
        req.flash('there was an error during the saving of your comment')
        console.error(error);
    }
})





module.exports = router;