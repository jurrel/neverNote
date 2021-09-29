import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotes} from '../../store/note';
import NotePageMapping from './NotePageMapping'
import './NotePage.css'
import { useParams } from "react-router-dom";


function NotePage() {
    const dispatch = useDispatch();
    const userNote = useSelector((state) => state.note)
    const notes = Object.values(userNote)
    console.log('this is noootes', notes)

    // const note = Object.values(userNotebook)

    useEffect(()=> {
        dispatch(getNotes());
    },[dispatch])

    return(
        <div className="note-page-container"> 
          <h1>ALL the Notes display</h1>
          <div>
                {notes?.map((note)=> (
                    <div key={note.id}>
                       <NotePageMapping note={note} />
                    </div>
                ))}
            </div>
        </div>
    )

}

export default NotePage

