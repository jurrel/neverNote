import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { createNote} from '../../store/note';
import {getNotebooks} from '../../store/notebook'
import {getNotes} from '../../store/note'

function CreateNewNote(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userNotebook = useSelector((state) => state.notebook)
    const notebooks = Object.values(userNotebook)
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [notebookId, setNotebookId] = useState();
    const editContent = (e) => setContent(e.target.value)
    const editTitle = (e) => setTitle(e.target.value)

    console.log('james')
    useEffect(()=> {
        dispatch(getNotebooks());
        dispatch(getNotes())
    },[dispatch])

    const handleCreateNote = async(e) => {
        e.preventDefault();

        const payload = {
            title,
            content,
            id: notebookId,
            user_id: user?.['users']?.['id']
        }
        console.log('what returns in the payload', payload)
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
                    placeholder="Note Title"
                    value={title}
                    onChange={editTitle}
                />
                <textarea
                    type="text"
                    placeholder="Let's not forget what's being written in here"
                    value={content}
                    onChange={editContent}
                />
                <button type="submit" className="submit-btn-upload">Submit</button>
            </form>
        </>
    )
}

export default CreateNewNote;
