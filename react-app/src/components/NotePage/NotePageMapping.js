import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editANote, getNotes, deleteANote} from '../../store/note';

import { Modal } from '../context/Modal';

import './NotePage.css'
import parse from 'html-react-parser';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';



function NotePageMapping({note}) {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.note);

    const string = 'string'
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(note?.title);
    const [content, setContent] = useState(note?.content)
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([])


    useEffect(() => {
        dispatch(getNotes())
        setTitle(note?.title)
    }, [dispatch, note?.title]);

    const handleEditNote = async(e) => {
       e.preventDefault();
        const payload = {
            content,
            id: note.id,
            title,
            user_id: note?.['id'],
            notebook_id: note?.['notebook_id']
        }
        let data = await dispatch(editANote(payload))
        if (!data) {
            setErrors(data)
            setShowModal(!showModal)
        } else {
            setContent()
            setTitle()
        }
    };

    useEffect(() => {
        const errors = [];
        let newTitle = title
        if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("***RTitle must be 1 to 15 characters")
        setValidationErrors(errors)
    }, [title])

    if (!notes) return null;

    const handleCancel = async (e) => {
		e.preventDefault();
		setShowModal(false);
        setValidationErrors([]);
        setTitle((note?.title))
        setContent((note?.content))
		return;
	};

     const handleDeleteButton = async() => {
        await dispatch(deleteANote(note))

    }

    const editTitle = (e) => setTitle(e.target.value)
    const typedContent = (value) => {
        setContent(value)
    }

    return(
        <div >
            <div className="new-note-button" onClick={() => setShowModal(!showModal)}>
                <div>
                    <div>
                        <h2 className='notes-display-font'>
                            {note?.title}
                        </h2>
                        <i
                        className="fa fa-trash-o"
                        onClick={() => handleDeleteButton()}
                        title="Edit Notebook"/>
                        <p className="note-content">
                        {typeof note?.content === typeof string ? parse(note?.content) : <></>  }
                        </p>
                        <p className="note-time">
                            {note?.updatedAt === null ?
                                note?.createdAt?.substr(7,4) + ' ' + note?.createdAt?.slice(5,7) + ' ' + note?.createdAt?.slice(12,16):
                                note?.updatedAt?.substr(7,4) + ' ' + note?.updatedAt?.slice(5,7) + ' ' + note?.updatedAt?.slice(12,16)
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div >
                <div>
                    {showModal && (
                        <Modal onClose={() => setShowModal(!showModal)}>
                            <form className='note-page-edit-modal' onSubmit={handleEditNote} >
                                <h2>{note.title}</h2>
                                <div>
                                    <div className="edit-comment-errors">
                                        {validationErrors?.map((error) => (
                                            <p key={error}>
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="New Title"
                                        defaultValue={title}
                                        onChange={editTitle} />
                                </div>
                                <div>
                                    <ReactQuill
                                        className='quill'
                                        type="text"
                                        placeholder="Let's not forget what's being written in here"
                                        value={content}
                                        onChange={typedContent}
                                    />
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
        </div>
    )
}

export default NotePageMapping
