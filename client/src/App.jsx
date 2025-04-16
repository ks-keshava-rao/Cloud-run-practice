import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchNotes = async () => {
    const res = await fetch(`${API_URL}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: note }),
    });
    setNote('');
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const saveEdit = async () => {
    await fetch(`${API_URL}/notes/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editContent }),
    });
    setEditingId(null);
    setEditContent('');
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <h1>📝 Notes</h1>
      <form onSubmit={addNote}>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="New note" />
        <button>Add</button>
      </form>
      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            {editingId === n.id ? (
              <>
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={saveEdit}>💾</button>
                <button onClick={() => setEditingId(null)}>✖️</button>
              </>
            ) : (
              <>
                {n.content}
                <button onClick={() => startEdit(n)}>✏️</button>
                <button onClick={() => deleteNote(n.id)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
