const asyncHandler = require('express-async-handler')

// @desc Get notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    res.json({ message: "Get notes"});
})

// @desc Set note
// @route POST /api/notes
// @access Private
const setNote = asyncHandler(async (req, res) => {
    console.log(req.body);
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }
    res.json({ message: "Set note"});
})

// @desc Update note
// @route PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    res.json({ message: `Update note ${req.params.id}`});
})

// @desc Delete note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    res.json({ message: `delete note ${req.params.id}`});
})

module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote
}