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

    useEffect(()=> {
        dispatch(getNotes());
    },[dispatch])

    return(
        <div className="note-page-container"> 
          <h1>ALL the Notes display</h1>
          <div>
                {notes?.map((note)=> (
                    <NotePageMapping key={note.id} note={note} />
                ))}
            </div>
            <NewNotebook/>
        </div>
    )

}

export default NotePage

