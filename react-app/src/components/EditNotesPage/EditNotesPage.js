import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editANote, getNotes} from '../../store/note';
import { useParams } from 'react-router-dom';
import './editnotespage.css';
import { Modal } from '../context/Modal';

function EditNotesPage({note, setUpdateNote}) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const notes = useSelector(state => state.note);
    const { id } = useParams();
    const notesTest = useSelector(state => Object.values(state.note).filter(notesTests => (
        notesTests.id ===  +id
    )));
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([])
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState( notesTest[0]?.title);
    const [content, setContent] = useState(notes?.[id]?.content)


    const handleEditNote = async(event) => {
       event.preventDefault();
        const payload = {
            content,
            id,
            title,
            user_id: user?.['users']?.['id'],
            notebook_id: notes?.[id]?.['notebook_id']
        }
        let data = await dispatch(editANote(payload))
        if (data) {
            setErrors(data)
            setShowModal(true);
        } else {
            setTitle('')
            setContent('')
            setErrors([])
            setShowModal(false);
        }
    };

    useEffect((id) => {
        dispatch(getNotes())
    }, [dispatch]);
    useEffect(() => {
        const errors = [];
        let newTitle = title
        if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("Title must be 1 to 15 characters")
        setValidationErrors(errors)
    }, [title])
    
    if (!notes) return null;

    const handleCancle = async (e) => {
		e.preventDefault();
		setShowModal(false);
        setTitle('')
        setContent('')
		return;
	};



    const editTitle = (e) => setTitle(e.target.value)
    const editContent = (e) => setContent(e.target.value)

  
    return(
        <div className='edit-notebook-page-background'>  
            <div className='edit-notebook-page-content'>
                <div>{notes[id]?.title}</div>
                <div>{notes[id]?.content}</div>
                <div className="new-note-button" onClick={() => setShowModal(!showModal)}>
                <h3 onClick={() => setShowModal(!showModal)}>Edit</h3></div>
			{showModal && (
				<Modal onClose={() => setShowModal(!showModal)}>
                    <form className='new-note-modal' onSubmit={handleEditNote} >
                        <h2>Edit Notebook</h2>
                    <div>
                        <div className="edit-comment-errors">
                            {validationErrors?.map((error, int) => (<div key={int}>{error}</div>))}
                        </div>
                        <input
                            type="text"
                            placeholder="New Title"
                            devalue={title}
                            onChange={editTitle} />
                            </div>
                        <div>
                        <textarea
                        rows="18" cols="50"
                        type="text"
                        placeholder="Content"
                        value={content}
                        onChange={editContent} />
                        </div>
                        <div>
                            <button type="submit" className="save-button-new-note">Save</button>
                            <button className="cancel-button-new-note" type="button" onClick={handleCancle}>
                                        Cancel
                            </button> 
                        </div>
                    </form>
				</Modal>
			)}
            </div>
        </div>
    )
}

export default EditNotesPage

 