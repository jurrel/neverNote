import { Modal } from '../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { createNote} from '../../store/note';
import {getNotebooks} from '../../store/notebook';
import {getNotes} from '../../store/note';
import './createnote.css';

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

    useEffect(()=> {
        dispatch(getNotebooks());
        dispatch(getNotes())
    },[dispatch])

    useEffect(() => {
        const errors = [];
        let newTitle = title
        if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("***Title must be 1 to 15 characters")
        setValidationErrors(errors)
    }, [title])

    const handleCreateNote = async(e) => {
        e.preventDefault();
        const payload = {
            title,
            content,
            id: notebookId,
            user_id: user?.['users']?.['id']
        }
        let data = await dispatch(createNote(payload))

        if (!data) {
            setErrors(data)
            setShowModal(true)
        } else {
            setTitle('')
            setContent('')
            setErrors([])
            setShowModal(false);
        }
    };



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
                <div className="line"></div>
			{showModal && (
				<Modal onClose={() => setShowModal(!showModal)}>
                    <form
                    className="new-note-modal"
                    onSubmit={handleCreateNote} >
                        <h1>NEW NOTE</h1>
                        {notebooks.length === 0 ? <div>No Notebook available, please create one</div>: <></>}
                    <select
                    value = {notebookId}
                    onChange={(e)=> {
                        const notebookSelect = e.target.value;
                        setNotebookId(notebookSelect)
                    }}>
                            {notebooks?.map((notebook) => {
                                return (
                                    <option key={notebook.id} value={notebook.id}>{notebook.title}</option>
                                );
                            })}
                        </select>
                        <div className="edit-comment-errors">
                            {validationErrors?.map((error) => (
                            <p key={error}>
                                {error}
                            </p>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Note Title"
                            value={title}
                            onChange={editTitle}
                        />
                        <textarea
                            rows="16"
                            cols="50"
                            type="text"
                            placeholder="Let's not forget what's being written in here"
                            value={content}
                            onChange={editContent}
                        />
                        <button disabled={validationErrors.length > 0} type="submit" className="save-button-new-note">Save</button>
                        <button className="cancel-button-new-note" type="button" onClick={handleCancle}>
                                    Cancel
                        </button>
                    </form>
				</Modal>
			)}
		</>
	);
}

export default CreateNewNoteModal;
