import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import NotebookMap from './NotebookMap'
import './notebook.css'

function Notebooks() {
    const user = useSelector((state) => state.session.user)
    // const dispatch = useDispatch();
    console.log('yeah', user.notebooks)
    const [selectedNotebook, setSelectedNotebook] = useState(1);

    return(
        <>  
            <h1>All Notebooks display</h1>
            <div>
                {user.notebooks?.map((notebook)=> (
                    <div key={notebook.id}>
                       <NotebookMap notebook={notebook} setSelectedNotebook={setSelectedNotebook} user={user}/>
                    </div>
                ))}
            </div>
        </>
    )

}

export default Notebooks