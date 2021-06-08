const Note = require('../models/noteSchema')

module.exports.getNotesController = async (req, res, next) => {
  const notes = await Note.find()
  if(notes.length === 0){
      res.send('There is no note to show')
  }else{
      res.send(notes)
  }
}

module.exports.addNotesController = async (req, res, next) => {
    const note = new Note(req.body)
    await note.save()
    res.send(note)
}