const express = require("express");
const router = express.Router();
//const User = require("../model/User");
const Manga = require("./../model/Manga");
const uploader = require("./../config/cloudinary");


router.get('/mangas', (req, res, next) => {
  Manga.find().populate("author")
  .then(dbMangas => {
    console.log('all mangas found in the databases :', dbMangas)
    res.render('mangas/list', { mangas: dbMangas });
  })
  .catch(err => {
    console.error('there was an error while getting the mangas list from the database', err);
    next(err);
  })
})

router.get("/mangas/:id", async (req, res) => {
  try{
    const detail = await Manga.findById(req.params.id);
    res.render("mangas/details.hbs", {manga : detail})
  }catch (er){
    console.error(er);
  }
});


router.post('/mangas/:id')





module.exports = router;