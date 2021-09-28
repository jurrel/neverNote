//constnant
const LOAD_ALL_NOTE = 'note/LOAD';
const ADD_NOTE = 'note/ADD';
const DELETE_NOTE = 'note/DELETE';
const EDIT_NOTE = 'note/EDIT';

//action creator
export const loadAllNotes = notes => ({
    type: LOAD_ALL_NOTE,
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

//Thunk
export const loadAllNoteT = () => async dispatch => {
    const response = await fetch(`/api/auth`);

    if (response.ok) {
        const notes = await response.json();
        dispatch(loadAllNoteT(notes))
    }
};

//Create a note
export const createNote = (content, id, notebook_id, title, user_id) => async(dispatch) => {
    const response = await fetch(`/api/note_routes/${id}/newNote`, {
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

//Reducer
const noteReducer = (state={}, action) => {
    switch(action.type) {
        // case LOAD_ALL_NOTE:
        //     const allNote = {...action.note}
        //     return {...allNote,...state}
        // case ADD_NOTE:
        //     const addNewNote = {...state}
        //     addNewNote[action.note.id] = action.note
        //     return addNewNote
        // case DELETE_NOTE:
        //     const note = {...state}
        //     delete note[action.note]
        //     return note
        // case EDIT_NOTE:
        //     const editNote = {...state}
        //     editNote[action.notebook.id] = action.notebook
        //     return editNote
        default:
            return state;
    }
}

export default noteReducer;