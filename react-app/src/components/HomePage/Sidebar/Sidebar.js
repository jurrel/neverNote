import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link, NavLink} from 'react-router-dom';
import CreateNewNote from '../../NoteCRUD/CreateNewNote'
import NoteSidebar from './NoteSidebar/NoteSidebar'
import LogoutButton from '../../auth/LogoutButton'; /*Remove later, just here for convienence*/
import './sidebar.css'




function Sidebar() {

    return(
        <>
            {/* <div className="sidebar-container"> */}
                
    
               
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
