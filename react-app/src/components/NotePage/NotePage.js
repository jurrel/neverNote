import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotes} from '../../store/note';
import NotePageMapping from './NotePageMapping'
import CreateNewNoteModal from '../NoteCRUD/CreateNewNoteModal' 
import './NotePage.css'


function NotePage() {
    const userNote = useSelector((state) => state.note)
    const notes = Object.values(userNote)
    const dispatch = useDispatch();

    console.log('notes', notes)
    console.log('entries', Object.entries(userNote))
    console.log('sort', notes.map(note=> Object.entries(note)))

    // const [sortedNotes, setSortedNotes] = useState(
    //     notes?.map(note => note)
    // )
    //  const sortedNotes = notes.sort((a,b) => b.)
    // console.log('yes', notes?.map(note => note.createdAt).sort((a,b)=> a.createdAt - b.createdAt));
    // console.log('yesssss', notes?.map(note => note.createdAt).sort((a,b)=> b.createdAt - a.createdAt));
    // console.log('sort', notes?.sort((a,b)=> a.createdAt - b.createdAt));
    // console.log('sort2', notes?.sort((a,b)=> b.createdAt - a.createdAt));

    // console.log('ssss', notes.notes)
    const noteLength = notes.length

    useEffect(()=> {
        dispatch(getNotes());
    },[dispatch])


    return(
        <div className='note-page-background'>
            <div className="note-page-container"> 
                <h1 className='note-page-note-counter'>Notes</h1>
                <div className='note-page-note-counter'>{noteLength} Notes</div>
                <CreateNewNoteModal/>
                <div>
                    {notes?.map((note, index)=> (
                        <NotePageMapping 
                            key={note.id} 
                            note={note} 
                        />
                    ))
                    }
                </div>
            </div>
        </div>
    )

    // function order(a, b) {
    // return a < b ? -1 : (a > b ? 1 : 0);
    // }
    // var arr2 = arr.map(function(item) { ... }).sort(order);
    // const sorted = note.

    // return(
    //     <div className='note-page-background'>
    //         <div className="note-page-container"> 
    //             <h1 className='note-page-note-counter'>Notes</h1>
    //             <div className='note-page-note-counter'>{noteLength} Notes</div>
    //             <CreateNewNoteModal/>
    //             <div>
    //                 {notes?.map((note, index)=> (
    //                     <>
    //                         {/* <h1>{note.title} {note.updatedAt}</h1> */}
    //                         <h3>{note}</h3>
    //                     </>
    //                 )).sort((a,b) => b.createdAt - a.CreatedAt)
    //                 }
    //             </div>
    //         </div>
    //     </div>
    // )

}

export default NotePage

