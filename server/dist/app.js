"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = require("crypto");
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let notes = [];
// Get all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});
// Create new note
app.post('/notes', (req, res) => {
    const { content } = req.body;
    if (content) {
        const newNote = { id: (0, crypto_1.randomUUID)(), content };
        notes.push(newNote);
        res.status(201).json(newNote);
    }
    else {
        res.status(400).json({ error: 'Content is required' });
    }
});
// Delete a note
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    notes = notes.filter(note => note.id !== id);
    res.json({ message: 'Note deleted' });
});
// Edit a note
app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const note = notes.find(n => n.id === id);
    if (note && content) {
        note.content = content;
        res.json({ message: 'Note updated' });
    }
    else {
        res.status(404).json({ error: 'Note not found or invalid content' });
    }
});
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
