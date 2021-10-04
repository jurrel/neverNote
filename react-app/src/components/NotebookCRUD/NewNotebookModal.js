import { Modal } from '../context/Modal';
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { createNotebook} from '../../store/notebook';
import './newnotebookmodal.css'

function NewNotebookModal() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
   

    const editTitle = (e) => setTitle(e.target.value)
 
    
    const handleCreateNotebook = async(e) => {
        e.preventDefault();
        
        const payload = {
            title,
            user_id: user?.['users']?.['id']
        }
        let data = await dispatch(createNotebook(payload))
        if (data) {
            setErrors(data)
            setShowModal(true);
        } else {
            setTitle('')
            setErrors([])
            setShowModal(false);
        }
    };

    const handleCancle = async (e) => {
		e.preventDefault();
		setShowModal(false);
        setTitle('')
        setErrors([])
		return;
	};
	
	return (
		<>
            <button className="new-notebook-button" onClick={() => setShowModal(true)}>
                <i
					className="fa fa-plus plus-icon " 
					onClick={() => setShowModal(true)}
				/><h3 className='new-notebook-button-text'>New</h3></button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
                    <form 
                        className="new-notebook-modal"
                        onSubmit={handleCreateNotebook} >
                            <div className="new-notebook-modal-title"> Create new notebook</div>
                            <div>Notebooks are useful for getting notes around a common topic</div>
                            <div className="new-notebook-modal-title-1">Name</div>
                            <div className='errors'>
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                    ))}
                            </div>
                        <input
                            type="text"
                            placeholder="NOTEBOOK Name"
                            value={title}
                            onChange={editTitle} />
						<div>
                                <button className="new-notebook-modal-cancle-button" type="button" onClick={handleCancle}>
                                    Cancel
                                </button>
                                <button className="new-notebook-modal-cancle-button" type="submit">Create</button>
                           
						</div>
                    </form>       
				</Modal>
			)}
		</>
	);
}

export default NewNotebookModal;