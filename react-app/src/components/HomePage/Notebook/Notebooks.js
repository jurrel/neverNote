import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import './notebook.css'

function Notebooks() {
    const user = useSelector((state) => state.session.user)
    // const dispatch = useDispatch();
    console.log('yeah', user.notebooks)
    const [selectedNotebook, setSelectedNotebook] = useState(1);

    return(
        <>  
            <h1>All Notebooks display</h1>
            <div className='middle-content'>
                {user.notebooks?.map((notebook)=> (
                    <div key={notebook.id}>
                        <div onClick={(e) => setSelectedNotebook(notebook.id)}>
                            <p className="tests" >
                                {notebook.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

export default Notebooks