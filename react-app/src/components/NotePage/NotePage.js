import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotes} from '../../store/note';
import NotePageMapping from './NotePageMapping'
import CreateNewNoteModal from '../NoteCRUD/CreateNewNoteModal'
import NotePageEdit from './NotePageEdit'

import './NotePage.css'


function NotePage() {
    const dispatch = useDispatch();
    const userNote = useSelector((state) => state.note)
    const notes = Object.values(userNote)
    const userNotebook = useSelector((state) => state.notebook)
    const notebooks = Object.values(userNotebook)


    const [activeNote, setActiveNote] = useState(notes?.[0])

    const sortedNotes = notes?.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    const noteLength = notes.length

    useEffect(()=> {
        dispatch(getNotes());
    },[dispatch]);


    const getActiveNote = () => {
        return notes.find((note) => note.id === activeNote);
    }

      return(
        <div className='note-page-background'>
                <div className="note-page-container">
                    <div className="note-side-bar">
                        <div className="notes-scrollbar">
                        <h2 className='note-page-note-counter'>Notes</h2>
                        <div className='note-page-note-counter'>{noteLength} Notes</div>
                        <CreateNewNoteModal userNote={userNote} notebooks={notebooks}/>
                            {sortedNotes.map((note)=>{
                                return  (
                                    <div className={`selected-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNote(note.id)}>
                                        <NotePageMapping
                                            key={note.id}
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

export default NotePage
