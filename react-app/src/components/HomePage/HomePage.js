import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link, NavLink} from 'react-router-dom';
import NewNotebookPage from '../NewNotebookPage/NewNotebookPage'
import NavBar from '../NavBar/NavBar';
import signUpPage2 from '../../assets/2.jpg'
import signUpPage3 from '../../assets/3.jpg'
import Notebooks from './Notebook/Notebooks'

import './homepage.css'
import Sidebar from './Sidebar/Sidebar';



function HomePage() {
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    console.log(user)

    return(
        <>  
            <Sidebar/>
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
            {/* <NewNotebookPage/> */}
        </>
    )


}

export default HomePage;
