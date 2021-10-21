import { useSelector} from 'react-redux';


import EditPageModal from './NotePageModal'
import './NotePage.css'


function NotePageMapping({note}) {
    const user = useSelector(state => state.session.user);


    return(
        <div className="notes-container">  
            <div>
                <h2 className='notes-display-font'>
                    {note.title} 
                </h2>
                <p className="note-content">
                    {note.content} 
                </p> 
            </div>
            <EditPageModal note={note}/>
        </div>
    )
}

export default NotePageMapping

 