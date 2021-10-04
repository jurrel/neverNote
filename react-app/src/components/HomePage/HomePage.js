import React, {useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { getNotebooks } from '../../store/notebook'; 
import {getNotes} from '../../store/note'
import './homepage.css'
import homepage from '../../assets/home2.jpeg'



function HomePage() {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getNotebooks());
        dispatch(getNotes());
    },[dispatch])
    

    return(
        <>  
            <div className="homepage-main-container">
                <img className="homepage-photo"src={homepage} alt=''/>
                <div className="welcome">
                    <h1>WELCOME TO THE NEW HOMEPAGE</h1>
                    <h3 className='home-body'> TURN NEVER INTO FOREVER! If you looking for a new simple
                        note taking app with a catchy slogan then look no further. 
                        Nevernote is loosely based off of the popular note taking app called 
                        Evernote. This project uses Python/Flask for the backend. Javascript/react
                        was used for the front end.
                    </h3>
                </div>
            </div>
        </>
    )
}

export default HomePage;
