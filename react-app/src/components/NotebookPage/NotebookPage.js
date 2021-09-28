import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotebooks} from '../../store/notebook';
import NotebookPageMapping from './NotebookPageMapping';
import './NotebookPage.css'

function NotebookPage() {
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const [selectedNotebook, setSelectedNotebook] = useState(1);
    console.log('What am i clicking', setSelectedNotebook)


    return(
        <> 
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
                        {user.notebooks?.map((notebook)=> (
                            <div key={notebook.id}>
                                <NotebookPageMapping notebook={notebook} setSelectedNotebook={setSelectedNotebook} user={user.notebooks} />
                            </div>
                        ))}
                    </tbody>     
                </table>
            </div>
        </>
    )

}

export default NotebookPage

