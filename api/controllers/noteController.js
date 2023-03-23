const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel');

// @desc Get notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
})

// @desc Set note
// @route POST /api/notes
// @access Private
const setNote = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }
    const note = await Note.create({
        text: req.body.text
    })

    res.json(note)
})

// @desc Update note
// @route PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if(!note) {
        res.status(400);
        throw new Error('Note not found');
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    
    res.json(updatedNote);
})

// @desc Delete note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
    if(!note) {
        res.status(400);
        throw new Error('Note not found');
    }
    await Note.findByIdAndDelete(req.params.id)
    res.json({id: req.params.id});
})

module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote
}