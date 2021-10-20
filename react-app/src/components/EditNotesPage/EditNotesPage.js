import { useState, useEffect, setState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editANote, getNotes, getANote} from '../../store/note';
import { useParams } from 'react-router-dom';
import './editnotespage.css';
import { Modal } from '../context/Modal';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

function EditNotesPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const notes = useSelector(state => state.note);

    const remoteHTMLTags =  (str) => {
        return str?.replace(/<[^>]*>?/gm, '');
    };
    useEffect(() => {
        dispatch(getANote(id))
        setTitle(notes?.title)
        setContent(remoteHTMLTags(notes?.content))
    }, [dispatch, id, notes?.title, notes?.content]);




    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(remoteHTMLTags(notes?.content))

    const [title, setTitle] = useState(notes.title);
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([])




    const handleEditNote = async(e) => {
       e.preventDefault();
        const payload = {
            content,
            id,
            title,
            user_id: notes?.id,
            notebook_id: notes?.notebook_id
        }
        let data = await dispatch(editANote(payload))
        if (!data) {
            setErrors(data)
            setShowModal(!showModal)
        } else {
            setContent(content)
            setTitle(title)
        }
    };


    useEffect(() => {
        const errors = [];
        let newTitle = title
        if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("***RZTitle must be 1 to 15 characters")
        setValidationErrors(errors)
    }, [title])

    if (!notes) return null;

    const handleCancel = async (e) => {
		e.preventDefault();
		setShowModal(false);
        setValidationErrors([]);
        setTitle(notes?.title)
        setContent(remoteHTMLTags(notes?.content))
		return;
	};



    const editTitle = (e) => setTitle(e.target.value)
    const typedContent = (value) => {
        setContent(remoteHTMLTags(value))
    }


    return(
        <div className='edit-notebook-page-background'>
            <div className='edit-notebook-page-content'>
                <h1>{notes?.title}</h1>
                <div className="new-note-button" onClick={() => setShowModal(!showModal)}>
                <h3 onClick={() => setShowModal(!showModal)}>Edit</h3></div>
                <div className="box">{remoteHTMLTags(notes?.content)}</div>
			{showModal && (
				<Modal onClose={() => setShowModal(!showModal)}>
                    <form className='new-note-modal' onSubmit={handleEditNote} >
                        <h2>Edit NotebookS</h2>
                    <div>
                        <div className="edit-comment-errors">
                            {validationErrors?.map((error) => (
                                <p key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="New Title"
                            defaultValue={title}
                            onChange={editTitle} />
                            </div>
                        <div>
                        <ReactQuill
                        type="text"
                        placeholder="Let's not forget what's being written in here"
                        defaultValue={content}
                        onChange={typedContent} />
                        </div>
                        <div>
                            <button disabled={validationErrors.length > 0}type="submit" className="save-button-new-note">Save</button>
                            <button className="cancel-button-new-note" type="button" onClick={handleCancel}>
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
