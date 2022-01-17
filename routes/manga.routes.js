const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Manga = require("./../model/Manga");



router.get("/manga-create", (req, res) => {
    res.render("mangas/create.hbs")
});

router.post("/manga-create", (req, res) => {
    const newManga = { ...req.body };
    console.log(req.body)
    Manga.create(newManga);
    res.redirect("/mangas")
});

router.get('/mangas', (req, res, next) => {
    Manga.find()
    .populate('author')
    .then(dbMangas => {
      console.log('all mangas found in the databases :', dbMangas)
      res.render('mangas/list', { mangas: dbMangas });
    })
    .catch(err => {
      console.eror('there was an error while getting the mangas list from the database', err);
      next(err);
    })
  })

  module.exports = router;