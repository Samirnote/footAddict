const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Manga = require("../model/manga");
const Comment = require("../model/Comment");
const uploader = require("../config/cloudinary");
const protectRoute = require("../middlewares/protectRoute");


router.get("/dashboard", protectRoute, function (req, res) {
  // JE veux recuperer les magas cree par l'utilisateur.
  // J'ai besoin de l'id de l'utilisateur
  // l'id est dans res.session.currentUser._id

  Manga.find({ author: req.session.currentUser._id })
    .then(dbMangas => {
      console.log('all mangas found in the databases :', dbMangas)
      res.render('dashboard', { mangas: dbMangas });
    })
    .catch(err => {
      console.error('there was an error while getting the mangas list from the database', err);
      next(err);
    })

});

router.get("/dashboard/manga-create", protectRoute, (req, res) => {
  res.render("dashboard/create.hbs")
});

router.post("/dashboard/manga-create", protectRoute, uploader.single("cover"), (req, res) => {
  console.log(req.body)
  const newManga = { ...req.body };

  if (!req.file) newManga.cover = undefined;
  else newManga.cover = req.file.path;

  newManga.author = req.session.currentUser._id
  Manga.create(newManga);
  req.flash("success", "Your Manga have been successfully created !");
  res.redirect("/dashboard")
});

router.get('/dashboard/delete/:id', protectRoute, async (req, res) => {
  try {
    await Manga.findByIdAndDelete(req.params.id)
    await Comment.deleteMany({ manga: req.params.id })
    res.redirect('/dashboard');

  } catch (err) {
    console.log(err);
  }
});


router.get('/dashboard/update/:id', protectRoute, async (req, res, next) => {
  try {
    const dbResp = await Manga.findById(req.params.id);
    res.render('dashboard/mangaUpdate', { manga: dbResp })
  } catch (err) {
    console.error(err);
  }
})

router.post("/dashboard/update/:id", protectRoute, uploader.single("cover"), async (req, res, next) => {
  
  try {
    const oldMangaVersion = await Manga.findById(req.params.id);
    //console.log("oldMangaVersion.cover", oldMangaVersion.cover);
    const updatedManga = { ...req.body };
    if (!req.file) updatedManga.cover = oldMangaVersion.cover;
    else updatedManga.cover = req.file.path;
    //console.log("req", req);
    await Manga.findByIdAndUpdate(req.params.id, updatedManga, { new: true });
    req.flash("success", "Your Manga have been successfully updated !");
    res.redirect('/dashboard')
  }  catch (err) {
    console.error(err);
  }
})

module.exports = router;
