const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const {getNotesController, addNotesController, getNoteController, putNoteController, deleteNoteController} = require('../controllers/notesController')
const {auth} = require('../middleware/auth')
const {admin} = require('../middleware/admin')
const {error} = require('../middleware/error')

//get 
router.get('/', auth, admin, getNotesController,error)

router.get('/:id', auth, check('id', 'Invalid note id').isMongoId(), getNoteController, error )

//post 
router.post('/',auth , addNotesController, error)

//put
router.put('/:id', auth, check('id', 'Invalid note id'), putNoteController, error)

//delete

router.delete('/:id', auth, check('id', 'Invalid note id').isMongoId(), deleteNoteController, error)

module.exports = router;