import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANote, editANote} from '../../store/note';
import EditNotesPage from '../EditNotesPage/EditNotesPage'
import EditPageModal from './NotePageModal'
import './NotePage.css'


function NotePageMapping({note}) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState(note.title);
    const user = useSelector(state => state.session.user);
    const [content, setContent] = useState(note.content)

    const [updateNote, setUpdateNote] = useState(false)

     const handleDeleteButton = async() => {
        await dispatch(deleteANote(note))
        
    }
    const updateHelperFunction = (e) => {
        setUpdateNote(!updateNote)
    }
    // const handleEditNote = async() => {
       
    //     const payload = {
    //         content,
    //         id: note.id,
    //         title,
    //         user_id: user?.['users']?.['id'],
    //         notebook_id: note.notebook_id
    //     }
    //     console.log('payload',payload)
    //     let updateNote = await dispatch(editANote(payload))
    //     if (updateNote) {
    //         setTitle('');
    //     }
    // }
    return(
        <div className="notes-container">  
            <div>
            <h2 className='notes-display-font'>
                {note.title} 
            </h2>
            
            <p className="note-content">
                {note.content} 
            </p> 
            </div>
            <EditPageModal note={note}/>
        </div>
    )
}

export default NotePageMapping

 