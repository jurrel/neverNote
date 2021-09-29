import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getNotebooks, deleteANotebook} from '../../store/notebook';
import NotebookPageMapping from './NotebookPageMapping';
import { useParams } from "react-router-dom";
import './NotebookPage.css'

function NotebookPage() {
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const notebook = useSelector((state) => state.notebook)
    console.log('this is gr', notebook)

    
    

    useEffect(()=> {
        dispatch(getNotebooks());
    },[dispatch])

    return(
        <> 
            <h1>This is Notebook Page</h1>
            <div className='tableContainer'>
                    <table className='table'>
                        <thead className="thead">
                            <tr>
                                <th>Notebook Title</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                    <tbody className="tbody">
                        {/* <Fragment> */}
                            {notebook.notebooks?.map((notebook)=> (
                                <NotebookPageMapping key={notebook.id} notebook={notebook} user={user.notebooks} />
                            ))}
                        {/* </Fragment> */}
                    </tbody>     
                </table>
            </div>
        </>
    )

}

export default NotebookPage

//you're almost there