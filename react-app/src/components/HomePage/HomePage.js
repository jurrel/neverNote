import React, {useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { getNotebooks } from '../../store/notebook'; 
import './homepage.css'


function HomePage() {
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
