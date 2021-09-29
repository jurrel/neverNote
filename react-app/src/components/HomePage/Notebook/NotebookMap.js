import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import './notebook.css'

function NotebookMap({notebook, setSelectedNotebook}) {
    // const dispatch = useDispatch();
    return(
        <>  
            <div className="middle-content" onClick={(e) => setSelectedNotebook(notebook.id)}>
                <p className="tests" >
                    {notebook.title}
                </p>
            </div>

        </>
    )

}

export default NotebookMap

