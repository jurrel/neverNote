import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotebooks} from '../../store/notebook';
import NotebookPageMapping from './NotebookPageMapping';
import NewNotebook from '../NotebookCRUD/NewNotebook'
import './NotebookPage.css'

function NotebookPage() {
    
    const dispatch = useDispatch();
    const userNotebook = useSelector((state) => state.notebook)
    const notebooks = Object.values(userNotebook)
    

    
    useEffect(()=> {
        dispatch(getNotebooks());
    },[dispatch])

    return(
        <> 
            <div className="note-page-container">
            <h1>This is Notebook Page</h1>
                <div className='tableContainer'>
                        <table className='table'>
                            <thead className="thead">
                                <tr>
                                    <th>Notebook Title</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                </tr>
                            </thead>
                        <tbody className="tbody">
                            {notebooks?.map((notebook) => (
                                <NotebookPageMapping key={notebook.id} notebook={notebook} />
                            ))}
                        </tbody>     
                    </table>
                    <NewNotebook notebooks={notebooks}/>
                </div>
            </div>
        </>
    )

}

export default NotebookPage
