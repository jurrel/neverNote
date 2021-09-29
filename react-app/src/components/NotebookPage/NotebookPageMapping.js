import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANotebook} from '../../store/notebook'


function NotebookPageMapping({notebook}) {
    const dispatch = useDispatch();
    const userNotebook = useSelector((state) => state.notebook)
   

    //this is call back of event handler
    const handleDeleteButton = async() => {
        await dispatch(deleteANotebook(notebook))
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
                    <button type="button" onClick={() => handleDeleteButton()}>Edit Button</button>  
                </td>
            </tr>
        </>
    )

}

export default NotebookPageMapping


