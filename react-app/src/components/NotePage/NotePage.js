import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotes} from '../../store/note';
import NotePageMapping from './NotePageMapping'
import NewNotebook from '../NoteCRUD/CreateNewNote';
import CreateNewNoteModal from '../NoteCRUD/CreateNewNoteModal' 
import './NotePage.css'


function NotePage() {
    const userNote = useSelector((state) => state.note)
    const notes = Object.values(userNote)
     const dispatch = useDispatch();
    
    const noteLength = notes.length

    useEffect(()=> {
        dispatch(getNotes());
    },[dispatch])


    return(
        <div className='note-page-background'>
            <div className="note-page-container"> 
            <h1 className='note-page-note-counter'>Notes</h1>
            <div className='note-page-note-counter'>{noteLength} Notes</div>
            <CreateNewNoteModal/>
            <div>
                    {notes?.map((note, index)=> (
                        <NotePageMapping 
                            key={note.id} 
                            note={note} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}

export default NotePage

