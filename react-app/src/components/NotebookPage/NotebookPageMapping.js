import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {deleteANotebook} from '../../store/notebook'


function NotebookPageMapping({notebook}) {
    const dispatch = useDispatch();
    console.log('hyhhh', notebook)

    const handleDeleteButton = async(e) => {
        await dispatch(deleteANotebook(notebook.id))
    }
    // console.log(n)
    return(
        <>  
            <tr className="middle-content tbody">
                {/* <td>{title}</td> */}
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


