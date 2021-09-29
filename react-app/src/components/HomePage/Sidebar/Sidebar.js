import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link, NavLink} from 'react-router-dom';
import NotebooksSidebar from './NotebooksSidebar/NotebooksSidebar'
import CreateNewNote from '../../NoteCRUD/CreateNewNote'
import NoteSidebar from './NoteSidebar/NoteSidebar'
import NewNoteButton from './NewNoteButton/NewNoteButton';
import HomeSidebar from './HomeSidebar/HomeSidebar';
import LogoutButton from '../../auth/LogoutButton'; /*Remove later, just here for convienence*/
import NewNotebook from '../../NotebookCRUD/NewNotebook'
import './sidebar.css'




function Sidebar() {

    return(
        <>
            {/* <div className="sidebar-container"> */}
                
                <div className="sidebar-home">
                    <HomeSidebar/>
                </div>
                <div>
                    <NewNoteButton/>
                </div>
                <div className="sidebar-notebook">
                    <NotebooksSidebar/>
                </div>
                <div>
                    <NoteSidebar/>
                </div>
                <div>
                    <NewNotebook/>
                </div>
                <div>
                    <CreateNewNote/>
                </div>
                    <LogoutButton/>   {/*Remove later, just here for convienence*/}
            
            {/* </div> */}
            
        </>
    )
}

export default Sidebar;
