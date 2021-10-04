import { useState } from 'react';
import { useSelector} from 'react-redux'
import NotebookMap from './NotebookMap'
import './notebook.css'

function Notebooks() {
    const user = useSelector((state) => state.session.user)
    const userNotebook = useSelector((state) => state.notebook)
    const [selectedNotebook, setSelectedNotebook] = useState('');
    const normalize = Object.values(userNotebook)
    return(
        <>  
            <h1>All Notebooks display</h1>
            <div>
                {normalize?.map((notebook)=> (
                    <div key={notebook.id}>
                       <NotebookMap notebook={notebook} setSelectedNotebook={setSelectedNotebook} user={user}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Notebooks