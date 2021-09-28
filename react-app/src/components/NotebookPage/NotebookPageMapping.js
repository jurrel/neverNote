import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';

function NotebookPageMapping({notebook, setSelectedNotebook, user}) {
    const dispatch = useDispatch();
 
    return(
        <>  
            <div className="middle-content tbody" onClick={(e) => setSelectedNotebook(notebook.id)}>
                <tr>
                    <td>{notebook.title}</td>
                    <td>{notebook.createdAt}</td>
                    <td>{notebook.updatedAt}</td>
                </tr>
            </div>
                      
        </>
    )

}

export default NotebookPageMapping


