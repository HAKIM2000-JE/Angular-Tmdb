const mongoose = require('mongoose')


const commentaireSchema = new mongoose.Schema({
    contenu: {type: String},
	idFilm:{type: String},
	

	


})








module.exports = mongoose.model('commentaire', commentaireSchema)