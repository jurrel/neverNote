import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'


function Notebooks() {
    const user = useSelector((state) => state.session.user)
    // const dispatch = useDispatch();
    console.log('yeah', user.notebooks)

    return(
        <>  
            {user.notebooks?.map((notebook)=> (
                <div key={notebook.id}>
                    <h1>{notebook?.title}</h1>
                </div>
            ))}
            <h1>All Notebooks display</h1>
        </>
    )

}

export default Notebooks