const express = require('express')
const router = express.Router()


const  Commentaire = require('../models/commentaire')



router.get('/',  async (req, res) => {

    
    const commentaires = await Commentaire.find().sort({ createdAt: 'desc' })

    console.log( 'from mongo'+  commentaires)
    


    

    
})



router.post('/', async (req, res, next) => {
    const commentaire = req.body;


    const commentaireToSave = new Commentaire({ contenu: commentaire.contenu, idFilm: commentaire.id });
     res.send(await commentaireToSave.save());
    

  
    
    


})








module.exports = router