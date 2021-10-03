import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANotebook, editANotebook} from '../../store/notebook';
import './NotebookPage.css';

function NotebookPageMapping({notebook, notesList}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userNotebook = useSelector(state => state.notebook)
    const [title, setTitle] = useState('');
    const [updateNote, setUpdateNote] = useState(false);
    const [toggleNote, setToggleNote] = useState(false);
    const [clic, setClic] = useState('');
    const editTitle = (e) => setTitle(e.target.value)
    console.log('this is uesssss', userNotebook)

    console.log(clic)
    const handleDeleteButton = async() => {
        await dispatch(deleteANotebook(notebook))
    }

    const handleEditNotebookButton = async() => {
       
        const payload = {
            title,
            id: notebook.id,
            user_id: user?.['users']?.['id']
        }
        let updateNotebook = await dispatch(editANotebook(payload))
        if (updateNotebook) {
            setTitle('');
        }
    }
    const updateHelperFunction = (e) => {
        setUpdateNote(!updateNote)
    }

    const handleToggle = () => {
        setToggleNote(!toggleNote);
    }

    return(
        <>  
            <div className="middle-content" >
                <div className='notebook-page-click-toggle' onClick={() => handleToggle()}><i class="fa fa-angle-right"></i>
{notebook.title}</div>

                    <div className='notebook-page-click-toggle-content'> 
                        {toggleNote === true ? 
                            notesList.map((note, index) => (
                                        <div key={index}>
                                            <div onClick={(e) => setClic(note.id)} className="notebook-text">Title: {note.title}</div>
                                        </div >
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
                    <input
                        type="text"
                        placeholder="New Title"
                        defaultValue={notebook.title}
                        onChange={editTitle} />
                    <button type="submit" className="submit-btn-upload">Submit</button>
                </form> : <></>} 
            </div>

        </>
    )

}

export default NotebookPageMapping


