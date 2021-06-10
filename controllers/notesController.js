const { validationResult } = require('express-validator')
const Note = require('../models/noteSchema')

module.exports.getNotesController = async (req, res, next) => {
    try{
        const notes = await Note.find()
        if(notes.length === 0){
            res.send('There is no note to show')
        }else{
            res.send(notes)
        }
    }catch(error){
        next(error)
    }

}

module.exports.getNoteController = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).send(error)
    }else{

        try{
            const id = req.params.id
            const author = req.user.id
            let note = await Note.findOne({_id: id})
            const comparision = author.localeCompare(note.author)
            if(!comparision == 0){
                return res.status(401).send('You are not allowed to see this note')
            }else{
                note = await note.execPopulate('author')
                res.send(note)
            }
        }catch(error){
            next(error)
        }


    }
 

}

module.exports.addNotesController = async (req, res, next) => {
    const authorId = req.user.id
    const note = new Note({...req.body, author: authorId})
    await note.save()
    res.send(note)
}

module.exports.putNoteController = async (req, res, next) => {
    
    const error = validationResult(req)
    
    if(!error.isEmpty()){
        res.status(400).send(error)
    }else{
        try{
            const id = req.params.id
            const author = req.user.author
            const input = _.pick(req.body, ['title', 'description'])
            let note = await Note.findById(id)
            const comparision = author.localeCompare(note.author)
            
            if(!comparision == 0){
                return res.status(401).send('You are not allowed to access this note')
    
            }else{
                note = await Note.findOneAndUpdate({_id: note.id}, input, {new: true, runValidators: true})
                res.send(note)
            }
        }catch(error){
            next(error)
        }

    }

}

module.exports.deleteNoteController = async (req, res, next) => {

    const error = validationResult(req)
    
    if(!error.isEmpty()){
        return res.status(400).send(error)

    }else{
        try{
            const id = req.params.id
            const author = req.user.author
            let note = await Note.findById(id)
            if(!note){
                res.status(404).send('Note not found')
            }else{
                const comparision = author.localeCompare(note.author)
                if(!comparision == 0){
                    return res.status(401).send('You are not allowed to access this note')
    
                }else{
                    note = await Note.findOneAndDelete({_id: note.id})
                    res.send(note)
                }
            }  
        }catch(error){
            next(error)
        }
       

            
            


    }
}