const SET_NOTES  = 'note/LOAD';
const SET_SINGLE_NOTE  = 'note/LOADSINGLENOTE';
const ADD_NOTE = 'note/ADD';
const DELETE_NOTE = 'note/DELETE';
const EDIT_NOTE = 'note/EDIT';

//action creator
export const setNotes = notes => ({
    type: SET_NOTES,
    notes
})

export const setSingleNote = note => ({
  type: SET_SINGLE_NOTE,
  note
})

export const addNote = note => ({
    type: ADD_NOTE,
    note
})
export const deleteNote = note => ({
    type: DELETE_NOTE,
    note
})
export const editNote = note => ({
    type: EDIT_NOTE,
    note
})

//Thunk working
export const getNotes = () => async dispatch => {
    const response = await fetch(`/api/note_routes/`);

    if (response.ok) {
        const notes = await response.json();
        dispatch(setNotes(notes.notes))
    }
};

export const getANote = (id) => async dispatch => {
    const response = await fetch(`/api/note_routes/${id}`);
    if (response.ok) {
      const note = await response.json();
      console.log('dsa',note)
        dispatch(setSingleNote(note))
    }
};

//Create a note
export const createNote = ({content, id, title, user_id}) => async(dispatch) => {
    const response = await fetch(`/api/notebook_routes/${id}/newNote`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            content,
            id,
            title,
            user_id
         }),
    });
    if (response.ok) {
        const note = await response.json();
        dispatch(addNote(note))
        return note
    }
}

//Delete note
export const deleteANote = ({id}) => async(dispatch) => {
    const response = await fetch(`/api/note_routes/delete/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteNote(id));
    }
}

export const editANote = ({title, user_id, id, content,notebook_id} ) => async(dispatch) => {
  const response = await fetch(`/api/note_routes/edit/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            id,
            title,
            user_id,
            content,
            notebook_id,
         }),
    });
    if (response.ok) {
        const note = await response.json();
        dispatch(editNote(note))
    }
}

//Reducer
const noteReducer = (state={}, action) => {
    switch(action.type) {
        case SET_NOTES :
            const newState = {}
            // console.log('this is action', action)
            action.notes.forEach(note => {
                newState[note.id] = note
            })
            return newState
        // case SET_SINGLE_NOTE:
        //     console.log('what is single', action.note)
        //     const single = {...state};
        //     // console.log('this is action', action.note)
        //     return {...action.note}
        case SET_SINGLE_NOTE:
            console.log('what is single', action.note)
            const single = {...action.note};
            return single
        case ADD_NOTE:
            const addNewNote = {...state}
            addNewNote[action.note.id] = action.note
            return addNewNote
        case DELETE_NOTE:
            const note = {...state}
            delete note[action.note]
            return note
        case EDIT_NOTE:
            const editNote = {...state}
            editNote[action.note.id] = action.note
            return editNote
        default:
            return state;
    }
}

export default noteReducer;
