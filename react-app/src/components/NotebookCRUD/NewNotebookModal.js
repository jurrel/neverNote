import { Modal } from '../context/Modal';
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createNotebook} from '../../store/notebook';
import './newnotebookmodal.css'

function NewNotebookModal() {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');

    const editTitle = (e) => setTitle(e.target.value)
 
    
    const handleCreateNotebook = async(e) => {
        e.preventDefault();
        
        const payload = {
            title,
            user_id: user?.['users']?.['id']
        }
        let newNotebook = await dispatch(createNotebook(payload))
        setShowModal(false);
        if (newNotebook) {
            history.push('/')
        }
    }
    const handleCancle = async (e) => {
		e.preventDefault();
		setShowModal(false);
		return;
	};
	
	return (
		<>
            <button className="new-note-button" onClick={() => setShowModal(true)}>
                <i
					className="fa fa-plus plus-icon " 
					onClick={() => setShowModal(true)}
				/><h3 className='new-note-button-text'>New</h3></button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
                    <form 
                        className="new-note-modal"
                        onSubmit={handleCreateNotebook} >
                            <div>Create new notebook</div>
                            <div>Notebooks are useful for getting notes around a common topic</div>
                            <div>Name</div>
                        <input
                            type="text"
                            placeholder="NOTEBOOK Name"
                            value={title}
                            onChange={editTitle} />
                        <button type="submit" className="submit-btn-upload">Submit</button>
						<div>
							<button className="cancel_button" type="button" onClick={handleCancle}>
								Cancel
							</button>
							<button className="create_button" type="submit">Create</button>
						</div>
                    </form>       
				</Modal>
			)}
		</>
	);
}

export default NewNotebookModal;