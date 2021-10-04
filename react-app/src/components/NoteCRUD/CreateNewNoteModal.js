import { Modal } from '../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createNotebook} from '../../store/notebook';
// import { useDispatch, useSelector} from 'react-redux'
import { createNote} from '../../store/note';
import {getNotebooks} from '../../store/notebook';
import {getNotes} from '../../store/note';

function CreateNewNoteModal() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user);
    const userNotebook = useSelector((state) => state.notebook)
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([])
    const notebooks = Object.values(userNotebook)
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [notebookId, setNotebookId] = useState(notebooks?.[0]?.['id']);
    
    const editContent = (e) => setContent(e.target.value)
    const editTitle = (e) => setTitle(e.target.value)
    console.log('what is user?.users?.id', user?.users?.id)

    useEffect(()=> {
        dispatch(getNotebooks());
        dispatch(getNotes())
    },[dispatch])

    const handleCreateNote = async(e) => {
        e.preventDefault();

        const payload = {
            title,
            content,
            id: notebooks?.[0]?.['id'], 
            user_id: user?.['users']?.['id']
        }
        let data = await dispatch(createNote(payload))   
        console.log('before payload',showModal )    
        console.log('what is data', data) 
        if (data) {
            setErrors(data)
            setShowModal(true)
        } else {
            setTitle('')
            setContent('')
            setErrors([])
            setShowModal(!showModal);
            console.log('if fail', showModal)
        }
    }
    useEffect(() => {
        const errors = [];
        let newTitle = title
        if (newTitle.length < 1 || newTitle.length > 15) errors.push("Title must be 1 to 15 characters")
        setValidationErrors(errors)
    }, [title])

    
    const handleCancle = async (e) => {
		e.preventDefault();
		setShowModal(false);
        setTitle('')
        setContent('')
		return;
	};
	
	return (
		<>
            <div className="new-note-button" onClick={() => setShowModal(!showModal)}>
                <h3 onClick={() => setShowModal(!showModal)}>New Note</h3></div>
			{showModal && (
				<Modal onClose={() => setShowModal(!showModal)}>
                    <form 
                    className="new-notebook-modal"
                    onSubmit={handleCreateNote} >
                        <h1>NEW NOTE</h1>
                        {notebooks.length === 0 ? <div>No Notebook available, please create one</div>: <></>}
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
                        <div className="edit-comment-errors">
                            {validationErrors.map((error, int) => (<div key={int}>{error}</div>))}
                        </div>
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
                        <button className="cancel_button" type="button" onClick={handleCancle}>
                                    Cancel
                        </button>   
                    </form>    
				</Modal>
			)}
		</>
	);
}

export default CreateNewNoteModal;