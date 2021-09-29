import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, NavLink} from 'react-router-dom';
import NewNotebook from '../NotebookCRUD/NewNotebook';
import NavBar from '../NavBar/NavBar';
import CreateNewNote from '../NoteCRUD/CreateNewNote';
import { getNotebooks } from '../../store/notebook'; 


import Notebooks from './Notebook/Notebooks'
import Sidebar from './Sidebar/Sidebar';

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
            <div className="main-container">

            </div>
            {/* <div className="main-container"> */}
                {/* <div className="current-user-on">
                    <p>{user.users.email}</p>
                </div> */}
                <Sidebar/>    
                {/* <NewNotebookPage/> */}
            {/* </div> */}
        {/* <img className="log-in-page-background" src={signUpPage3} alt=""/> */}
            {/* <div className='test_container'>
                <div className='sidebar'>
                    <h1>go</h1>
                </div>
            </div> */}



            {/* <div className='main-container'>
                <button>Create Notebook Button</button>
                <Link to='/'>
                    <span>Notebook</span>
                </Link>
                <Link to='/'>
                    <span>Notes</span>
                </Link>
                <Link to='/'>
                    <span>Tags</span>
                </Link>
            </div> */}
            {/* <Notebooks/> */}
        </>
    )
}

export default HomePage;
