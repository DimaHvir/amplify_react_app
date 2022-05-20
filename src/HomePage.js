import React, {useState, useEffect} from 'react';
import {API} from 'aws-amplify';
import {listNotes} from './graphql/queries';
import {createNote as createNoteMutation, deleteNote as deleteNoteMutation} from './graphql/mutations';

const initialFormState = {name: '', description: ''};

function HomePage({signOut, user}) {

  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect (() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({query: listNotes});
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    console.log("here")
    if (!formData.name || !formData.description) return;
    await API.graphql({query: createNoteMutation, variables: {input: formData}});
    setNotes([...notes, formData]);
    setFormData(initialFormState)
  }

  async function deleteNote({id}) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({query: deleteNoteMutation, variables: {input : {id}}});
  }

  const changeName = event => {
    event.preventDefault();
    setFormData({ ...formData, 'name' : event.target.value})
    console.log(formData.name)
  }

  return (
    <div className="App">
    <h1>My Notes App</h1>
    <input
      id = "name"
      onChange={changeName}
      placeholder="Note name"
      value={formData.name}
    />
    <input
      onChange={e => setFormData({ ...formData, 'description': e.target.value})}
      placeholder="Note description"
      value={formData.description}
    />
    <button onClick={createNote}>Create Note</button>
    <div style={{marginBottom: 30}}>
      {
        notes.map(note => (
          <div key={note.id || note.name}>
            <h2>{note.name}</h2>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note)}>Delete note</button>
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default HomePage