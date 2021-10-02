import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { createNote} from '../../store/note';
import {getNotebooks} from '../../store/notebook'

function CreateNewNote(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userNotebook = useSelector((state) => state.notebook)
    const notebooks = Object.values(userNotebook)
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [notebookId, setNotebookId] = useState(user.notebooks[0].id);
    const editContent = (e) => setContent(e.target.value)
    const editTitle = (e) => setTitle(e.target.value)
    


    useEffect(()=> {
        dispatch(getNotebooks());
    },[dispatch])

    const handleCreateNote = async(e) => {
        e.preventDefault();

        const payload = {
            title,
            content,
            id: notebookId,
            user_id: user?.['users']?.['id']
        }
        let newNote = await dispatch(createNote(payload))        
        if (newNote) {
            setTitle('')
        }
    }
    return (
        <>
            <form onSubmit={handleCreateNote} >
                <h1>NEW NOTE</h1>
               <select 
               value = {notebookId} 
               onChange={(e)=> {
                       const notebookSelect = e.target.value;
                   setNotebookId(notebookSelect)
               }}>
                    {notebooks?.map((notebook) => (
                        <option key={notebook.id}value={notebook.id}>{notebook.title}</option>                                  
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="NOTE Title"
                    value={title}
                    onChange={editTitle}
                />
                <textarea
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