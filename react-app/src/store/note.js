//constnant
const SET_NOTES  = 'note/LOAD';
const ADD_NOTE = 'note/ADD';
const DELETE_NOTE = 'note/DELETE';
const EDIT_NOTE = 'note/EDIT';

//action creator
export const setNotes = notes => ({
    type: SET_NOTES,
    notes
})

export const addNotebook = note => ({
    type: ADD_NOTE,
    note
})
export const deleteNotebook = note => ({
    type: DELETE_NOTE,
    note
})
export const editNotebook = note => ({
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

//Create a note
export const createNote = ({content, id, notebook_id, title, user_id}) => async(dispatch) => {
    const response = await fetch(`/api/notebook_routes/${id}/newNote`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            content,
            notebook_id,
            title,
            user_id
         }),
    });
    console.log({response: {content, id, notebook_id, title, user_id}})
}

//Delete note
export const deleteANote = (id) => async(dispatch) => {
    const response = await fetch(`/api/note_routes/delete/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteNotebook(id));
    }
}

//Reducer
const noteReducer = (state={}, action) => {
    switch(action.type) {
        case SET_NOTES :
            const newState = {}
            action.notes.forEach(note => {
                newState[note.id] = note
            })
            return newState
        case ADD_NOTE:
            const addNewNote = {...state}
            addNewNote[action.note.id] = action.note
            return addNewNote
        case DELETE_NOTE:
            const note = {...state}
            return note
        case EDIT_NOTE:
            const editNote = {...state}
            editNote[action.notebook.id] = action.notebook
            return editNote
        default:
            return state;
    }
}

export default noteReducer;