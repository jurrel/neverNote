import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {deleteANote, editANote, getNotes, setOneNote} from '../../store/note';
import { useParams } from 'react-router-dom';
import './editnotespage.css';


function EditNotesPage({note, setUpdateNote}) {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.note);
    const { id } = useParams();
    const notesTest = useSelector(state => Object.values(state.note).filter(notesTests => (
        notesTests.id ===  +id
    )));
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState( notesTest[0]?.title);
    const [content, setContent] = useState(notes?.[id]?.content)
    // console.log('@@@@@', notesTest)
    // console.log('thissss', notesTest?.['id'])
    // console.log('thissss', notesTest?.[id])
    // console.log('thissss', notesTest?.id)
    console.log('sdadsadsadsad', notesTest[0]?.title)

    // console.log('what is user_id', user?.['users']?.['id'])
    // console.log("what is notes?.[id]?.['id']", notes?.[id]?.['id'])
    // console.log('what is note id', notes?.[id]?.['title'])
    // const notesss = notesTest.filter(notesTests => (
    //     notesTests.id ===  +id
    // )))

    //the + sign turns it into a number

    // console.log('what is this notebook_id', notes?.[id]?.['notebook_id'])
    console.log('what is this notebookId', notes?.[id]?.content)

    const handleEditNote = async(event) => {
       event.preventDefault();
        const payload = {
            content,
            id,
            title,
            user_id: user?.['users']?.['id'],
            notebook_id: notes?.[id]?.['notebook_id']
        }
        console.log('@@@@@@',payload)
        let updateNote = await dispatch(editANote(payload))
        if (updateNote) {
            setTitle('');
        }
    }

    useEffect((id) => {
        dispatch(getNotes())
        // dispatch(setOneNote(id))
    }, [dispatch]);

    if (!notes) return null;



    const editTitle = (e) => setTitle(e.target.value)
    const editContent = (e) => setContent(e.target.value)

  
    return(
        <div className='edit-notebook-page-background'>  
            <div className='edit-notebook-page-content'>
                <div className='tes'>{notes.title}</div>
                <div>{notes[id]?.title}</div>
                <div>{notes[id]?.content}</div>
                <form onSubmit={handleEditNote} >
                   <div>
                        <input
                        type="text"
                        placeholder="New Title"
                        devalue={title}
                        onChange={editTitle} />
                        </div>
                    <div>
                        <textarea
                        type="text"
                        placeholder="Content"
                        value={content}
                        onChange={editContent} />
                        </div>
                    <div>
                        <button type="submit" className="submit-btn-upload">Submit</button>
                    </div>
                </form>
              
            </div>
        </div>
    )
}

export default EditNotesPage

 