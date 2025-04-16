import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let notes: any[] = [];

// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Create new note
app.post('/notes', (req, res) => {
  const { content } = req.body;
  if (content) {
    const newNote = { id: randomUUID(), content };
    notes.push(newNote);
    res.status(201).json(newNote);
  } else {
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
  } else {
    res.status(404).json({ error: 'Note not found or invalid content' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
