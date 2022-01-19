const express = require("express");
const router = express.Router();
const User = require("../model/User");  
const Manga = require("../model/Manga");
const Comment = require("../model/Comment");
const uploader = require("../config/cloudinary");
const protectRoute = require("../middlewares/protectRoute");


router.get("/profile", protectRoute, function (req, res) {
  // JE veux recuperer les magas cree par l'utilisateur.
  // J'ai besoin de l'id de l'utilisateur
  // l'id est dans res.session.currentUser._id
  
  Manga.find({author : req.session.currentUser._id})
  .then(dbMangas => {
    console.log('all mangas found in the databases :', dbMangas)
    res.render('profile', { mangas: dbMangas });
  })
  .catch(err => {
    console.error('there was an error while getting the mangas list from the database', err);
    next(err);
  })

});

router.get("/profile/manga-create", protectRoute, (req, res) => {
  res.render("profile/create.hbs")
});

router.post("/profile/manga-create", protectRoute, uploader.single("cover"), (req, res) => {
  console.log(req.body)
  const newManga = { ...req.body };

  if (!req.file) newManga.cover = undefined;
  else newManga.cover = req.file.path;

  newManga.author = req.session.currentUser._id
  Manga.create(newManga);
  res.redirect("/profile")
});

router.get('/profile/delete/:id', protectRoute, async (req,res) => {
try{
   await Manga.findByIdAndDelete(req.params.id)
   await Comment.deleteMany({manga:req.params.id})
    res.redirect('/profile');

}catch(err) {
    console.log(err);
}
});


router.get('/profile/update/:id', protectRoute, async(req,res,next)=>{
try{
   const dbResp = await Manga.findById(req.params.id);
   res.render('profile/mangaUpdate', {manga : dbResp})
}catch(err){ 
    console.error(err);
}
})

router.post("/profile/update/:id", protectRoute, async(req,res,next)=>{
try{
    await Manga.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.redirect('/profile')
}catch(err){
    console.error(err);
}
})

module.exports = router;
