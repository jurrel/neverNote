import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, NavLink} from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import CreateNewNote from '../NoteCRUD/CreateNewNote';
import { getNotebooks } from '../../store/notebook'; 


import Notebooks from './Notebook/Notebooks'

import './homepage.css'


function HomePage() {
    const user = useSelector((state) => state.session.user)
    //.notebook is what was used in the rootReducer  
    const notebooksgetthunk = useSelector((state) => state.notebook)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getNotebooks());
    },[dispatch])
    

    return(
        <>  
            <div className="homepage-main-container">
                <h1>WELCOME TO THE NEW HOMEPAGE</h1>
            </div>
        </>
    )
}

export default HomePage;
