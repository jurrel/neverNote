// import React, {useState, useEffect} from 'react';
// import { useDispatch, useSelector} from 'react-redux'
// import {  editANotebook} from '../../store/notebook';


// function EditNotebook({notebook}){
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.session.user)
//     const [title, setTitle] = useState('');

//     const editTitle = (e) => setTitle(e.target.value)

//     const handleEditNotebook = async(e) => {
//         e.preventDefault();

//         const payload = {
//             title,
//             user_id: user['users']['id']
//         }

//         let updateNotebook = await dispatch(editANotebook(payload))
//         if (updateNotebook) {
//             setTitle('');
//         }
//     }

//     return (
//         <>
//             <form onSubmit={handleEditNotebook} >
//                 <h1>Edit Notebook</h1>
//                 <textarea
//                     type="text"
//                     placeholder="New Title"
//                     value={title}
//                     onChange={editTitle} />
//                 <button type="submit" className="submit-btn-upload">Submit</button>
//             </form>         

//         </>
//     )
// }

// export default EditNotebook;
