import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editANote, getNotes, deleteANote} from '../../store/note';

import parse from 'html-react-parser';

function NotebookAllNotesPageMapping({note}) {
    const dispatch = useDispatch();
    const string = 'string'
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(note?.title);
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch, note?.title]);


    useEffect(() => {
        const errors = [];
        let newTitle = title
        if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("***RTitle must be 1 to 15 characters")
        setValidationErrors(errors)
    }, [title])

    if (!note) return null;


     const handleDeleteButton = async() => {
        await dispatch(deleteANote(note))
    }

    return(
        <>
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
                                note?.createdAt?.substr(7,4) + ' ' + note?.createdAt?.slice(5,7) + ' ' + note?.createdAt?.slice(12,16) + note?.createdAt?.substr(16):
                                note?.updatedAt?.substr(7,4) + ' ' + note?.updatedAt?.slice(5,7) + ' ' + note?.updatedAt?.slice(12,16) + ' ' + note?.updatedAt?.substr(16)
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotebookAllNotesPageMapping
