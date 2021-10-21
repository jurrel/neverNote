import { useSelector} from 'react-redux';
import parser from 'html-react-parser'



import EditPageModal from './NotePageModal'
import './NotePage.css'


function NotePageMapping({note}) {
    const user = useSelector(state => state.session.user);
    const string = 'string'


    return(
        <div className="notes-container">  
            <div>
                <h2 className='notes-display-font'>
                    {note.title} 
                </h2>
                <p className="note-content">
                    {typeof note?.content === typeof string ? parser(note?.content) : <></>  } 
                </p> 
            </div>
            <EditPageModal note={note}/>
        </div>
    )
}

export default NotePageMapping

 