import './NotePage.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editANote, getNotes, deleteANote} from '../../store/note';
import ReactQuill from 'react-quill'

function NotePageEdit({activeNote, setActiveNote}) {
  // if(!activeNote) return <div className="no-active-note">No Note Selected</div>
  const dispatch = useDispatch();
  const [title, setTitle] = useState(activeNote?.title );
  const [content, setContent] = useState(activeNote?.title)
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([])
  console.log('12113 activeNote', activeNote)
  console.log('12113 setActiveNote', setActiveNote)
  console.log('12113 title', setActiveNote)

    useEffect(() => {
        dispatch(getNotes())
        setValidationErrors([]);
        setTitle(activeNote?.title)
        setContent(activeNote?.content)
    }, [dispatch, activeNote?.title, activeNote?.content]);

    useEffect(() => {
      const errors = [];
      let newTitle = title
      if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("***RsssTitle must be 1 to 15 characters")
      setValidationErrors(errors)
  }, [title])


    console.log('editNNNN title', title)
    console.log('editNNNN', content)

    const handleEditNote = async(e) => {
      e.preventDefault();
       const payload = {
           content,
           id: activeNote?.id,
           title,
           user_id: activeNote?.id,
           notebook_id: activeNote?.notebook_id,
           updatedAt: Date.now(),
       }
       let data = await dispatch(editANote(payload))
       if (!data) {
           setErrors(data)
       } else {
           setContent()
           setTitle()
       }
   };


  const handleCancel = async (e) => {
		e.preventDefault();
    setTitle(activeNote?.title)
    setContent(activeNote?.content)
		return;
	};


  const editTitle = (e) => setTitle(e.target.value)
  const typedContent = (value) => {
    setContent(value)
}

  return (
    <div className='note-page-edit-form'>
      <form className='note-page-edit-form-layout' onSubmit={handleEditNote}>
        <div className="edit-comment-errors">
              {validationErrors?.map((error) => (
                  <p key={error}>
                      {error}
                  </p>
              ))}
        </div>
        <input
          type='text'
          id='title'
          placeholder="New Title"
          value={title}
          onChange={editTitle}
          autoFocus/>
        <ReactQuill
            className='react-quill'
            type="text"
            placeholder="Let's not forget what's being written in here"
            value={content || ""}
            onChange={typedContent}
        />
      <button className="cancel-button-new-not" type="button" onClick={handleCancel}>
                  Reset
      </button>
      <button disabled={validationErrors.length > 0}type="submit" className="save-button-notes-page">Save</button>
      </form>
      <div>

        {/* <button disabled={validationErrors.length > 0}type="submit" className="save-button-new-note">Save</button> */}
      </div>
    </div>
  )
}

export default NotePageEdit
