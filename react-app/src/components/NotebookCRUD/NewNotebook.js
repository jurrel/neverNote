import React, {useState} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createNotebook} from '../../store/notebook';


function NewNotebook(){
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('');

    const editTitle = (e) => setTitle(e.target.value)
 
    
    const handleCreateNotebook = async(e) => {
        e.preventDefault();
        
        const payload = {
            title,
            user_id: user['users']['id']
        }
        let newNotebook = await dispatch(createNotebook(payload))
        if (newNotebook) {
            history.push('/')
        }
    }
    
    return (
        <>
            <form onSubmit={handleCreateNotebook} >
                <h1>NEW NOTEBOOK</h1>
                <textarea
                    type="text"
                    placeholder="Notebook Name"
                    value={title}
                    onChange={editTitle} />
                <button type="submit" className="submit-btn-upload">Submit</button>
            </form>         
        </>
    )
}

export default NewNotebook;
