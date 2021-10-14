import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link, NavLink} from 'react-router-dom';

import {getNotes} from '../../store/note';
import NotePageMapping from './NotePageMapping'
import CreateNewNoteModal from '../NoteCRUD/CreateNewNoteModal' 
import './NotePage.css'


function NotePage() {
    const userNote = useSelector((state) => state.note)
    const notes = Object.values(userNote)
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [noteId, setNoteId] = useState('')

    
    const noteLength = notes.length

    useEffect(()=> {
        dispatch(getNotes());
    },[dispatch])

   /***************************BELOW**************************** */
   //clicking note automatically directs to /note page
    // return(
    //     <div className='note-page-background'>
    //         <div className="note-page-container"> 
    //             <h1 className='note-page-note-counter'>Notes</h1>
    //             <div className='note-page-note-counter'>{noteLength} Notes</div>
    //             <CreateNewNoteModal/>
    //             <div>
    //                 {notes?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))?.map((note)=> (

    //                     <NavLink to={`/notes/${note.id}`}>
    //                         <NotePageMapping 
    //                             key={note.id} 
    //                             note={note} 
    //                         />
    //                     </NavLink> 
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // )
    /***************************ABOVE**************************** */


    /***************************BELOW**************************** */
    return(
        <div className='note-page-background'>
            <div className="note-page-container"> 
                <h1 className='note-page-note-counter'>Notes</h1>
                <div className='note-page-note-counter'>{noteLength} Notes</div>
                <CreateNewNoteModal/>
                <div className='app-sidebar-notes' >
                    {notes?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))?.map((note)=> (
                        <NotePageMapping 
                            key={note.id} 
                            note={note} 
                            setNoteId={setNoteId}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
    /***************************ABOVE**************************** */


}

export default NotePage

