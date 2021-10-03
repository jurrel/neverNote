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
                    <div className="notepad">
                    {/* <hp>Note</h3> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;
