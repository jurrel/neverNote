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
  const notes = useSelector((state) => state.notebook.notes)
  console.log('yeeeet', userNotebook)
  const [activeNote, setActiveNote] = useState('')

  const [title, setTitle] = useState(activeNote?.title );

  const { id } = useParams();

  const sortedNotes = notes?.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))



  // console.log('yettie', userNotes)

  const getActiveNote = () => {
    return notes?.find((note) => note?.id === activeNote);
  }
  useEffect(()=> {
    dispatch(getNotebookAndNotes(id));
    dispatch(getNotes())
  },[dispatch,setTitle,title]);

    console.log('what is active', activeNote?.content)
    console.log('go')
    return (
      <div className="notebook-all-notes-pages-background">
        <div className="notebook-all-notes-pages-container">
          <div className="notebook-all-notes-sidebar">
            <h1>{userNotebook?.notebook?.title}</h1>
            <div className="notebook-all-notes-scrollbar">
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
