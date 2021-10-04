import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANote, editANote} from '../../store/note';
import EditNotesPage from '../EditNotesPage/EditNotesPage'
import './NotePage.css'


function NotePageMapping({note}) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState(note.title);
    const user = useSelector(state => state.session.user);
    const [content, setContent] = useState(note.content)

    const [updateNote, setUpdateNote] = useState(false)


    const editTitle = (e) => setTitle(e.target.value)
    const editContent = (e) => setContent(e.target.value)

     const handleDeleteButton = async() => {
        await dispatch(deleteANote(note))
        
    }
    const updateHelperFunction = (e) => {
        setUpdateNote(!updateNote)
    }
    const handleEditNote = async() => {
       
        const payload = {
            content,
            id: note.id,
            title,
            user_id: user?.['users']?.['id'],
            notebook_id: note.notebook_id
        }
        console.log('payload',payload)
        let updateNote = await dispatch(editANote(payload))
        if (updateNote) {
            setTitle('');
        }
    }
    return(
        <div>  
            <h2 className='notes-display-font'>
                {note.title}
            </h2>
            <p className="note-content">
                {note.content}
            </p>
             <button type="button" onClick={() => handleDeleteButton()}>Delete Button</button>
             <button type="button" onClick={() => updateHelperFunction()}>Edit Button</button>
            {/* {updateNote  === true ? 
               <EditNotesPage setUpdateNote={setUpdateNote} note={note.note}/>  : <></>
            } */}
             {updateNote  === true ? 
                <form onSubmit={handleEditNote} >
                    <input
                        type="text"
                        placeholder="New Title"
                        defaultValue={note.title}
                        onChange={editTitle} />
                    <textarea
                        type="text"
                        placeholder="Content"
                        defaultValue={note.content}
                        onChange={editContent} />
                    <button type="submit" className="submit-btn-upload">Save</button>
                </form>  : <></>
            }
        </div>
    )
}

export default NotePageMapping

 