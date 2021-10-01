import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANote, editANote} from '../../store/note'
import { useHistory } from 'react-router-dom'


function NotePageMapping({note}) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const user = useSelector(state => state.session.user);
    const [content, setContent] = useState('')

    const editTitle = (e) => setTitle(e.target.value)
    const editContent = (e) => setContent(e.target.value)

    const handleDeleteButton = async() => {
        console.log('handle delete button', note)
        await dispatch(deleteANote(note))
        
    }
    const handleEditNote = async() => {
       
        const payload = {
            content,
            id: note.id,
            title,
            user_id: user['users']['id'],
            notebook_id: note.notebook_id
        }
        console.log('payload',payload)
        let updateNote = await dispatch(editANote(payload))
        if (updateNote) {
            setTitle('');
        }
    }
    return(
        <>  
            <h1>
                {note.title}
            </h1>
            <p className="note-content">
                {note.content}
            </p>
             <button type="button" onClick={() => handleDeleteButton()}>Delete Button</button>
            <form onSubmit={handleEditNote} >
                <input
                    type="text"
                    placeholder="New Title"
                    value={title}
                    onChange={editTitle} />
                <textarea
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={editContent} />
                <button type="submit" className="submit-btn-upload">Submit Edit</button>
            </form>  
            {/* <button type="button" onClick={() => handleEditNote()}>Edit Button</button> */}
        </>
    )

}

export default NotePageMapping

 