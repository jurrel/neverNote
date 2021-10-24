import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotes} from '../../store/note';
import NotePageMapping from './NotePageMapping'
import CreateNewNoteModal from '../NoteCRUD/CreateNewNoteModal'
import NotePageEdit from './NotePageEdit'

import './NotePage.css'


function NotePage() {
    const userNote = useSelector((state) => state.note)
    const user = useSelector(state => state.session.user);
    const currentUserId = user.users.id
    const notes = Object.values(userNote)
    const userNotebook = useSelector((state) => state.notebook)
    const notebooks = Object.values(userNotebook)
    const dispatch = useDispatch();


    const [activeNote, setActiveNote] = useState(notes?.[0])
    const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(notes.length > 0 ? notes?.[0]: null);

    console.log('notdepagessss', notes?.[0])



    const noteLength = notes.length

    useEffect(()=> {
        dispatch(getNotes());
    },[dispatch]);

    const handleNoteClick = (noteId) => {
        const selectedNote = notes.find(note => note.id === noteId);
        setSelectedNote(selectedNote);
        setShowModal(true);
    };

    const getActiveNote = () => {
        return notes.find((note) => note.id === activeNote);
    }


      return(
        <div className='note-page-background'>
                <div className="note-page-container">
                    <div className="note-side-bar">
                        <h1 className='note-page-note-counter'>Notes</h1>
                        <div className='note-page-note-counter'>{noteLength} Notes</div>
                        <CreateNewNoteModal userNote={userNote} notes={notes} notebooks={notebooks}/>
                        <div className="notes-scrollbar">
                            {notes?.sort((a, b) => b.updatedAt?.localeCompare(a.updatedAt))?.map((note)=>{
                                return  (
                                    <div className={`selected-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNote(note.id)}>
                                        <NotePageMapping
                                            key={note.id}
                                            handleNoteClick={handleNoteClick}
                                            noteId={note.id}
                                            note={note}
                                            currentUserId={currentUserId}
                                            selectedNote={selectedNote}
                                            showModal={showModal}
                                            setShowModal={setShowModal}
                                            activeNote= {activeNote}
                                            setActiveNote = {setActiveNote}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <NotePageEdit
                        activeNote= {getActiveNote()}
                    />
                </div>
        </div>
    )



}

export default NotePage
