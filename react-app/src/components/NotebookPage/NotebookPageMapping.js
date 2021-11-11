import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANotebook, editANotebook} from '../../store/notebook';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './NotebookPage.css';

function NotebookPageMapping({notebook, notesList, toggleNotes, updateToggleNotes, index }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userNotebook = useSelector(state => state.notebook)
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(notebook.title);
    const [updateNote, setUpdateNote] = useState(false);
    const [clic, setClic] = useState('');
    const editTitle = (e) => setTitle(e.target.value)


    const [validationErrors, setValidationErrors] = useState([])



    const handleDeleteButton = async() => {
        await dispatch(deleteANotebook(notebook))
    }

    const handleEditNotebookButton = async() => {

        const payload = {
            title,
            id: notebook.id,
            user_id: user?.['users']?.['id']
        }
        let data = await dispatch(editANotebook(payload))
        if (data) {
            setErrors(data)
        } else {
            setTitle('')
            setErrors([])
        }
    }
     useEffect(() => {
        const errors = [];
        let newTitle = title
        if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("Title must be 1 to 15")
        setValidationErrors(errors)
    }, [title])


    const updateHelperFunction = (e) => {
        setUpdateNote(!updateNote)
    }

    const handleToggle = () => {
        const notes = toggleNotes ? toggleNotes.map((toggleState, id) => {
            if(id === index) {
                return !toggleState;
            } else {
                return toggleState;
            }
        }) : [];
        updateToggleNotes(notes);
    }


    return(
        <>
            <div className="middle-content" >
                <div className='notebook-page-click-toggle' onClick={() => handleToggle()}>
                    <i class="fa fa-angle-right"></i>
                    {notebook.title}
                </div>
                <div className='notebook-page-click-toggle-content'>
                    {toggleNotes && toggleNotes[index] === true ?
                        notesList.map((note, index) => (
                                    <BrowserRouter>
                                        <a key={index} href={`/${note.notebook_id}/notes`}>
                                            <div onClick={(e) => setClic(note.id)} className="notebook-text"> <i class="fa fa-file-text"></i>Title: {note.title}</div>
                                        </a >
                                    </BrowserRouter>
                                )) : <></>
                    }
                </div>
                <div onClick={() => updateHelperFunction(true)}>
                        <i
                            className="fa fa-edit"
                            onClick={() => updateHelperFunction(true)}
                            title="Edit Notebook"

                        />
                </div>
                <div onClick={() => handleDeleteButton()}>
                    <i
                        className="fa fa-trash-o"
                        onClick={() => handleDeleteButton()}
                        title="Edit Notebook"
                    />
                </div>
                {updateNote  === true ?
                    <form onSubmit={handleEditNotebookButton} >
                        <div className='errors'>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                                ))}
                        </div>
                        <input
                            type="text"
                            placeholder="New Title"
                            value={title}
                            onChange={editTitle} />
                        <button disabled={validationErrors.length > 0} type="submit" className="submit-btn-upload">Submit</button>
                    </form> : <></>
                }
                <div className="edit-comment-errors">
                        {validationErrors.map((error, int) => (<div key={int}>{error}</div>))}
                </div>
            </div>

        </>
    )

}

export default NotebookPageMapping
