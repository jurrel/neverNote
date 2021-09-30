import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createNote} from '../../store/note';


function CreateNewNote(){
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [notebookId, setNotebookId] = useState('');
    const editContent = (e) => setContent(e.target.value)
    const editTitle = (e) => setTitle(e.target.value)
    const editNotebook = (e) => setNotebookId(e.target.value)

    const handleCreateNote = async(e) => {
        e.preventDefault();

        const payload = {
            title,
            content,
            id: notebookId,
            user_id: user['users']['id']
        }
        let newNote = await dispatch(createNote(payload))
        if (newNote) {
            history.push('/')
        }
    }
    return (
        <>
            <form onSubmit={handleCreateNote} >
                <h1>NEW NOTE</h1>
                {/* NOTICE bottom is temporary */}
                <input
                    type="text"
                    placeholder="Notebook id"
                    value={notebookId}
                    onChange={editNotebook}
                />
                {/* NOTICE above code is temporary*/}
                <input
                    type="text"
                    placeholder="NOTE Title"
                    value={title}
                    onChange={editTitle}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={editContent}
                />
                <button type="submit" className="submit-btn-upload">Submit</button>
            </form>         

        </>
    )
}

export default CreateNewNote;