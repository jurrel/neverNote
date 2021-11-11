import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotebooks} from '../../store/notebook';
import {getNotes} from '../../store/note';
import NotebookPageMapping from './NotebookPageMapping';
// import NewNotebook from '../NotebookCRUD/NewNotebook';

import './NotebookPage.css'

function NotebookPage() {

    const dispatch = useDispatch();
    const userNotes = useSelector((state) => state.note);
    const notes = Object.values(userNotes);
    const [toggleNotes, setToggleNotes] = useState([]);
    const userNotebook = useSelector((state) => state.notebook)
    const notebooks = Object.values(userNotebook)

    const numNotebooks = notebooks.length

    useEffect(()=> {
        dispatch(getNotebooks());
        dispatch(getNotes());
    },[dispatch]);

    useEffect(() => {
        if(numNotebooks) {
            setToggleNotes(new Array(numNotebooks).fill(false))
        }
    }, [numNotebooks]);


    const updateToggleNotes = (notes) => {
        setToggleNotes(notes);
    };

    return(
        <>
            <div className="notebook-page-background">
                <div className="notebook-page-container">
                    <h1>Notebooks</h1>
                    <div className='notebook-counter'>{numNotebooks} Notebooks</div>

                            {notebooks?.map((notebook, index) => {
                                const notesList = notes.filter(note => note.notebook_id === notebook.id);
                                return (
                                    <NotebookPageMapping
                                    notesList={notesList}
                                    key={notebook.id}
                                    notebook={notebook}
                                    toggleNotes={toggleNotes}
                                    updateToggleNotes={updateToggleNotes}
                                    index={index}
                                    />
                                );
                            })
                        }
                    </div>
            </div>
        </>
    )

}

export default NotebookPage
