import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotes} from '../../store/note';
import NotePageMapping from './NotePageMapping'
import NewNotebook from '../NoteCRUD/CreateNewNote';
import './NotePage.css'


function NotePage() {
    const dispatch = useDispatch();
    const userNote = useSelector((state) => state.note)
    const notes = Object.values(userNote)
    const noteLength = notes.length

    useEffect(()=> {
        dispatch(getNotes());
    },[dispatch])

    return(
        <div className='note-page-background'>
            <div className="note-page-container"> 
            <h1 className='note-page-note-counter'>Notes</h1>
            <div className='note-page-note-counter'>{noteLength} Notes</div>
            <div>
                    {notes?.map((note)=> (
                        <NotePageMapping key={note.id} note={note} />
                    ))}
                </div>
                <NewNotebook/>
            </div>
        </div>
    )

}

export default NotePage

