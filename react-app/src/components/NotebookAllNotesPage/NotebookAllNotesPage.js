import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotebookAndNotes} from '../../store/notebook';
import { useParams } from 'react-router-dom';
import './NotebookAllNotesPage.css'
import NotebookAllNotesPageMapping from './NotebookAllNotesPageMapping'
import {getNotes} from '../../store/note';
import NotebookAllNotesEditPage from './NotebookAllNotesEditPage'

function NotebookAllNotesPage(){
  const dispatch = useDispatch();
  const userNotebook = useSelector((state) => state.notebook)
  const notes = useSelector((state) => state.note)
  const [activeNote, setActiveNote] = useState('')

  const [title, setTitle] = useState(activeNote?.title );

  const { id } = useParams();

  const notes1 = [];
  for(var k in notes) {
    if( notes[k].notebook_id == id)
      notes1.push(notes[k]);
  }
  const notesLength = notes1.length

  const sortedNotes = notes1?.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))



  const getActiveNote = () => {
    return notes[activeNote];
  }
  useEffect(()=> {
    dispatch(getNotebookAndNotes(id));
    dispatch(getNotes())
  },[dispatch,setTitle,title]);


    return (
      <div className="notebook-all-notes-pages-background">
        <div className="notebook-all-notes-pages-container">
          <div className="notebook-all-notes-sidebar">
            <div className="notebook-all-notes-scrollbar">
            <h1 className="notebook-all-notes-title">{userNotebook?.notebook?.title}</h1>
            <h3 className="notebook-all-notes-length">{notesLength} Notes</h3>
            {sortedNotes?.map((note)=>{
                  return  (
                      <div className={`selected-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNote(note.id)}>
                          <NotebookAllNotesPageMapping
                              key={note.id}
                              noteId={note.id}
                              note={note}
                          />
                      </div>
                  );
              })}
            </div>
          </div>
          <NotebookAllNotesEditPage
            setActiveNote= {getActiveNote()}
            setTitle= {setTitle}
            title = {title}
          />
        </div>
      </div>
    )
}

export default NotebookAllNotesPage;
