import { Modal } from '../context/Modal';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANote, editANote} from '../../store/note';
import { useState, useEffect } from 'react';
import './NotePage.css'

function EditPageModal({note}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session.user);
  
    
    
    const [title, setTitle] = useState(note?.title);
    const [content, setContent] = useState(note?.content)
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([])




    const editTitle = (e) => setTitle(e.target.value)
    const editContent = (e) => setContent(e.target.value)

    const handleDeleteButton = async() => {
        await dispatch(deleteANote(note))
        
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
    const handleCancle = async (e) => {
		e.preventDefault();
		setShowModal(false);
        setTitle('')
        setContent('')
		return;
	};
     useEffect(() => {
        const errors = [];
        let newTitle = title
        if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("Title must be 1 to 15 characters")
        setValidationErrors(errors)
    }, [title])


  
    return(
        <div >  
                <div className="new-note-button" onClick={() => setShowModal(!showModal)}>
                    <h3 onClick={() => setShowModal(!showModal)}>
                        <i className="fa fa-edit note-page-edit"></i>
                    </h3>
                </div>
                <i
                    className="fa fa-trash-o note-page-delete"
                    onClick={() => handleDeleteButton()}
                    title="Edit Note"
                />  
			{showModal && (
				<Modal onClose={() => setShowModal(!showModal)}>
                    <form className='new-note-modal' onSubmit={handleEditNote} >
                        <h2>Edit Notebook</h2>
                        <div className="edit-comment-errors">
                            {validationErrors?.map((error, int) => (<div key={int}>{error}</div>))}
                        </div>
                        <input
                            type="text"
                            placeholder="New Title"
                            defaultValue={note.title}
                            onChange={editTitle} />
                        <textarea
                            rows="18" 
                            cols="50"
                            type="text"
                            placeholder="Let's not forget what's being written in here"
                            defaultValue={note.content}
                            onChange={editContent} />
                        <button type="submit" className="save-button-new-note">Save</button>
                        <button className="cancel-button-new-note" type="button" onClick={handleCancle}>
                            Cancel
                        </button> 
                    </form>
				</Modal>
			)}
        </div>
    )
}

export default EditPageModal

 