import './notesidebar.css'
import Notebooks from '../../Notebook/Notebooks'
function NotebooksSidebar() {

    return(
        <>
          <div className='note-list'>
            <h1>NOTE SIDEBAR</h1>
            <div className='ellow'>
              <Notebooks/>  
            </div>
          </div>
        </>
    )
}

export default NotebooksSidebar;
