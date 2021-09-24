import React, {useState, useEffect} from 'react';
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createNotebook, editANotebook} from '../../store/notebook';


function CreateNotebook(){
    const dispatch = useDispatch();
    const history = useHistory()
    const [title, setTitle] = useState('');

}