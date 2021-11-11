import { useState, useEffect, setState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editANote, getNotes, getANote} from '../../store/note';
import { useParams } from 'react-router-dom';
import './editnotespage.css';
// import { Modal } from '../context/Modal';
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import EditPageModal from '../NotePage/NotePageModal';
import parse from 'html-react-parser';


import {getNotebookAndNotes} from '../../store/notebook';

function EditNotesPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const note = useSelector(state => state.note);
    const notet = useSelector(state => state.notebook);

    // const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(note?.content);
    const [title, setTitle] = useState(note.title);
    // const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const string = 'string';

    useEffect(() => {
        dispatch(getANote(id))
        dispatch(getNotebookAndNotes());
        setTitle(note?.title)
        setContent(note?.content)
    }, [dispatch, id, note?.title, note?.content]);


    useEffect(() => {
        const errors = [];
        let newTitle = title
        if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("***RZTitle must be 1 to 15 characters")
        setValidationErrors(errors)
    }, [title])

    if (!note) return null;


    return(
        <div className='edit-notebook-page-background'>
            <div className='edit-notebook-page-content'>
                <h1>{note?.title}</h1>
                <div className="box">
                    {typeof content === typeof string ? parse(content) : <></>}
                </div>
                <EditPageModal note={note}/>
            </div>
        </div>
    )
}

export default EditNotesPage
