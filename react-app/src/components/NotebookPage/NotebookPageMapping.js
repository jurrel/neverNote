import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANotebook} from '../../store/notebook'


function NotebookPageMapping({notebook, user}) {
    
    const dispatch = useDispatch();

    const handleDeleteButton = async(e) => {
        await dispatch(deleteANotebook(notebook.id))
    }
    

    return(
        <>  
            <tr className="middle-content tbody">
                <td>{notebook.title}</td>
                <td>{notebook.createdAt}</td>
                <td>{notebook.updatedAt}</td>
                <td>
                    <button type="button" onClick={() => handleDeleteButton(notebook.id)}>Delete Button</button>  
                </td>
                <td>
                    <button type="button" onClick={() => handleDeleteButton(notebook.id)}>Edit Button</button>  
                </td>
            </tr>
        </>
    )

}

export default NotebookPageMapping


