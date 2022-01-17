const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Manga = require("./../model/Manga");
const uploader = require("./../config/cloudinary");


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

router.get("/mangas/:id", async (req, res) => {
  try{
    const detail = await Manga.findById(req.params.id);
    res.render("mangas/details.hbs", {manga : detail})
  }catch (er){
    console.error(er);
  }
});


router.get("/manga-create", (req, res) => {
    res.render("mangas/create.hbs")
});

router.post("/manga-create", uploader.single("cover"), (req, res) => {
    const newManga = { ...req.body };
    console.log(req.body)
    Manga.create(newManga);
    res.redirect("/mangas")
});

router.get('/delete/:id', (req,res) => {
  Manga.findByIdAndDelete(req.params.id)
  .then((dbRes) => {
      console.log(dbRes);
      res.redirect('/mangas');
  })
  .catch((err) => {
      console.log(err);
  })
});


router.get('/update/:id', async(req,res,next)=>{
  try{
     const dbResp = await Manga.findById(req.params.id);
     res.render('mangas/mangaUpdate', {manga : dbResp})
  }catch(err){ 
      console.error(err);
  }
})

router.post("/update/:id", async(req,res,next)=>{
  try{
      await Manga.findByIdAndUpdate(req.params.id, req.body, {new:true});
      res.redirect('/mangas')
  }catch(err){
      console.error(err);
  }
})





module.exports = router;