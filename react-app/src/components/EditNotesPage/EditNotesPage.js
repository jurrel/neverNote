import { useState, useEffect, setState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editANote, deleteANote, getANote} from '../../store/note';
import { useParams } from 'react-router-dom';
import EditPageModal from '../NotePage/NotePageModal';
import parser from 'html-react-parser'


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
    const string = 'string'

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

   

    return(
        <div className='edit-notebook-page-background'>
            <div className='edit-notebook-page-content'>
                <h1>{note?.title}</h1>
                
                <div className="box">{typeof content === typeof string ?parser(content) : <></>}</div>
			<EditPageModal note={note}/>
            </div>
        </div>
    )
}

export default EditNotesPage