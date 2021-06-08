const express = require('express')
const router = express.Router()
const {getNotesController, addNotesController} = require('../controllers/notesController')

//get 
router.get('/', getNotesController)
//post 
router.post('/', addNotesController)


module.exports = router;