import ReactMarkdown from "react-markdown";


import EditPageModal from './NotePageModal'
import './NotePage.css'


function NotePageMapping({note}) {

   


    
    return(
        <div className="notes-container">  
            <div>
                <h2 className='notes-display-font'>
                    {note.title} 
                </h2>
                <ReactMarkdown className="note-content">
                    {note.content} 
                </ReactMarkdown> 
                <p className="note-time">
                    {note?.updatedAt === null ?
                        note?.createdAt.substr(7,4) + ' ' + note?.createdAt?.slice(5,7) + ' ' + note?.createdAt?.slice(12,16):
                        note?.updatedAt.substr(7,4) + ' ' + note?.createdAt?.slice(5,7) + ' ' + note?.createdAt?.slice(12,16)
                    } 
                </p> 
            </div>
            <EditPageModal note={note}/>
        </div>
    )
}

export default NotePageMapping

 