// import Notebooks from '../HomePage/Notebook/Notebooks'
// function NotesNavbar() {

//     return(
//         <>
//           {/* <div className='note-list'>
//             <h1>NOTE SIDEBAR</h1>
//             <div className='ellow'>
//               <Notebooks/>  
//             </div>
//           </div> */}
//         </>
//     )
// }

// export default NotesNavbar;

import { NavLink } from 'react-router-dom';
function NotesNavbar() {

    return(
        <>
          <NavLink to="/notes">
            <h1><i className="fa fa-book"></i> Notes</h1>  
          </NavLink>
        </>
    )
}

export default NotesNavbar;
