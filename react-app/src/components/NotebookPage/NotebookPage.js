import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotebooks} from '../../store/notebook';
import {getNotes} from '../../store/note';
import NotebookPageMapping from './NotebookPageMapping';
// import NewNotebook from '../NotebookCRUD/NewNotebook';

import './NotebookPage.css'

function NotebookPage() {
    
    const dispatch = useDispatch();
    const userNotebook = useSelector((state) => state.notebook)
    const userNotes = useSelector((state) => state.note)
    const notebooks = Object.values(userNotebook)
    const notes = Object.values(userNotes)
    
    

    const numNotebooks = notebooks.length
    useEffect(()=> {
        dispatch(getNotebooks());
        dispatch(getNotes());
    },[dispatch])

    return(
        <> 
            <div className="notebook-page-background">
                <div className="note-page-container">
                    <h1>Notebooks</h1>
                    <div className='notebook-counter'>{numNotebooks} Notebooks</div>
              
                            {notebooks?.map((notebook) => {
                                const notesList = notes.filter(note => note.notebook_id === notebook.id);
                                return (
                                    <NotebookPageMapping
                                    notesList={notesList}
                                    key={notebook.id} notebook={notebook} />
                                );
                            })
                        }
                    </div>
            </div>
        </>
    )

}

export default NotebookPage
