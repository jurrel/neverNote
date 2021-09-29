import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createNote} from '../../store/note';


function CreateNewNote(){
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
  
    return (
        <>
       
        </>
    )
}

export default CreateNewNote;
