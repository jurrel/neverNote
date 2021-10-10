import { useSelector} from 'react-redux';


import EditPageModal from './NotePageModal'
import './NotePage.css'


function NotePageMapping({note}) {
    const user = useSelector(state => state.session.user);

    // const timeStr = new Date(note[0].createdAt.getDate();
    const timeStr1 = new Date(Date.now()).getUTCMonth() + 1;
    const timeStr2 = new Date(Date.now()).getFullYear();
    // console.log('get Date', timeStr)
    // console.log('note[0]',timeStr)
    // const month = note.createdAt.substr(7,4)
    // const year = note.createdAt.slice(12,16)
    // const day = note.createdAt.slice(5,7)
    // console.log('get Month', day)



    const dateConverter = (note) => {
		const month = note.createdAt.substr(7,4)
		const year = note.createdAt.slice(12,16)
		const day = note.createdAt.slice(5,7)


        return ('too', month)
	
	};
    console.log('converted', dateConverter)
    
    return(
        <div className="notes-container">  
            <div>
                <h2 className='notes-display-font'>
                    {note.title} 
                </h2>
                <p className="note-content">
                    {note.content} 
                </p> 
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

 