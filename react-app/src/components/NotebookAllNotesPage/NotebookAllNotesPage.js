import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotebookAndNotes} from '../../store/notebook';
import { useParams } from 'react-router-dom';
import './NotebookAllNotesPage.css'
import NotebookAllNotesPageMapping from './NotebookAllNotesPageMapping'
import NotePageEdit from '../NotePage/NotePageEdit';
function NotebookAllNotesPage(){
  const dispatch = useDispatch();
  const userNotebook = useSelector((state) => state.notebook)
  const notes = Object.values(userNotebook)
  const [activeNote, setActiveNote] = useState(notes?.[0])
  const [selectedNote, setSelectedNote] = useState(notes.length > 0 ? notes?.[0]: null);

  const { id } = useParams();



  useEffect(()=> {
    dispatch(getNotebookAndNotes(id));
  },[dispatch]);

  const handleNoteClick = (noteId) => {
    const selectedNote = notes.find(note => note.id === noteId);
    setSelectedNote(selectedNote);
};


  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

    return (
      <div className="notebook-all-notes-pages-background">
        <div className="notebook-all-notes-pages-container">
          <div className="notebook-all-notes-sidebar">
            <h1>hi</h1>
            <div className="notes-scrollbar">
              {notes?.sort((a, b) => b.updatedAt?.localeCompare(a.updatedAt))?.map((note)=>{
                  return  (
                      <div className={`selected-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNote(note.id)}>
                          <NotebookAllNotesPageMapping
                              key={note.id}
                              handleNoteClick={handleNoteClick}
                              noteId={note.id}
                              note={note}

                          />
                      </div>
                  );
              })}
            </div>
          </div>
          <NotePageEdit
            activeNote= {getActiveNote()}
          />
        </div>
      </div>
    )
}

export default NotebookAllNotesPage;
