import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editANote, getNotes, deleteANote, getANote} from '../../store/note';
import {getNotebookAndNotes} from '../../store/notebook';
import { useParams } from 'react-router-dom';

import ReactQuill from 'react-quill'

function NotebookAllNotesEditPage({setActiveNote, title, setTitle}) {
  const dispatch = useDispatch();
console.log('what is activentoe', setActiveNote)
  // const [title, setTitle] = useState(setActiveNote?.title );
  const [content, setContent] = useState(setActiveNote?.content)
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
        setValidationErrors([]);
        dispatch(getANote(setActiveNote?.id))
        setTitle(setActiveNote?.title)
        setContent(setActiveNote?.content)
    }, [dispatch, setActiveNote?.title, setActiveNote?.content, setActiveNote?.id]);

  useEffect(() => {
    const errors = [];
    let newTitle = title
    if (newTitle?.length < 1 || newTitle?.length > 15) errors.push("***Title must be 1 to 15 characters")
    setValidationErrors(errors)
  }, [title])

  if(!setActiveNote) return <div className="no-active-note">No Note Selected</div>
  const handleEditNote = async(e) => {
    e.preventDefault();
      const payload = {
        content,
        id: setActiveNote?.id,
        title,
        user_id: setActiveNote?.id,
        notebook_id: setActiveNote?.notebook_id,
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
    setTitle(setActiveNote?.title)
    setContent(setActiveNote?.content)
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
        <button disabled={validationErrors.length > 0}type="submit" className="save-button-notes-page" >
          Save
        </button>
      </form>
    </div>
  )
}

export default NotebookAllNotesEditPage
