import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import signUpPage2 from '../../assets/2.jpg'
import signUpPage3 from '../../assets/3.jpg'




function HomePage() {
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();


    return(
        <>
            { !user ?
                <>
                    {/* <HomePageBeforeLogin/> */}
                    <h2>SHOULD BE SPLASH PAGE</h2>

                </>
            :
            <>
                <img className="log-in-page-background" src={signUpPage3} alt=""/>
            </>}
        </>
    )


}

export default HomePage;
