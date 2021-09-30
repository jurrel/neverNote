import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANotebook, editANotebook} from '../../store/notebook';
import EditNotebook from '../NotebookCRUD/EditNotebook';

function NotebookPageMapping({notebook}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('');
    const editTitle = (e) => setTitle(e.target.value)

    //this is call back of event handler
    const handleDeleteButton = async() => {
        await dispatch(deleteANotebook(notebook))
        
    }
    const handleEditNotebookButton = async() => {
       
        const payload = {
            title,
            id: notebook.id,
            user_id: user['users']['id']
        }

        let updateNotebook = await dispatch(editANotebook(payload))
        console.log('whatwhat', payload)
        if (updateNotebook) {
            setTitle('');
        }
    }
    
    return(
        <>  
            <tr className="middle-content tbody">
                <td>{notebook.title}</td>
                <td>{notebook.createdAt}</td>
                <td>{notebook.updatedAt}</td> 
                <td>
                    <button type="button" onClick={() => handleDeleteButton()}>Delete Button</button>  
                </td>
                <td>
                    <form onSubmit={handleEditNotebookButton} >
                <h1>Edit Notebook</h1>
                <textarea
                    type="text"
                    placeholder="New Title"
                    value={title}
                    onChange={editTitle} />
                <button type="submit" className="submit-btn-upload">Submit</button>
            </form>  
                </td>
                {/* <EditNotebook/> */}
            </tr>
        </>
    )

}

export default NotebookPageMapping


