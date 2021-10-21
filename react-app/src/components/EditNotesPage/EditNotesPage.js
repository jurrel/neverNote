import { useState, useEffect, setState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editANote, getNotes, getANote} from '../../store/note';
import { useParams } from 'react-router-dom';
import './editnotespage.css';
import { Modal } from '../context/Modal';


function EditNotesPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const note = useSelector(state => state.note);
    // console.log('What is the type of note?.content', typeof note?.content)
    // console.log(parse(JSON.stringify(note?.content)))

    // const remoteHTMLTags =  (str) => {
        //     return str?.replace(/<[^>]*>?/gm, '');
        // };
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(note?.content)
    const [title, setTitle] = useState(note?.title);
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([])


    useEffect(() => {
        dispatch(getANote(id))
        setTitle(note?.title)
        setContent(note?.content)
    }, [dispatch, id, note?.title, note?.content]);



    const handleEditNote = async(e) => {
       e.preventDefault();
        const payload = {
            content,
            id,
            title,
            user_id: note?.id,
            notebook_id: note?.notebook_id
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

    if (!note) return null;

    const handleCancel = async (e) => {
		e.preventDefault();
		setShowModal(false);
        setValidationErrors([]);
        setTitle(note?.title)
        setContent(note?.content)
		return;
	};



    const editTitle = (e) => setTitle(e.target.value)
    const editContent = (e) => setContent(e.target.value)



    return(
        <div className='edit-notebook-page-background'>
            <div className='edit-notebook-page-content'>
                <h1>{note?.title}</h1>
                <div className="new-note-button" onClick={() => setShowModal(!showModal)}>
                <h3 onClick={() => setShowModal(!showModal)}>Edit</h3></div>
                <div className="box">{content}</div>
                {console.log('this is note?.content', note?.content)}
                {console.log('this is note?.content type',  typeof note?.content)}
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
                        <textarea
                        type="text"
                        placeholder="Let's not forget what's being written in here"
                        defaultValue={content}
                        onChange={editContent} />
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