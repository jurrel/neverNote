//constnant
const SET_NOTEBOOKS = 'notebook/LOAD';
const ADD_NOTEBOOK = 'notebook/ADD';
const DELETE_NOTEBOOK = 'notebook/DELETE';
const EDIT_NOTEBOOK = 'notebook/EDIT';
const LOAD_NOTEBOOK_ALL_NOTES = 'notebook/LOAD_NOTEBOOK_ALL_NOTES';

//action creator
export const setNotebooks = notebooks => ({
    type: SET_NOTEBOOKS,
    notebooks
})

export const addNotebook = notebook => ({
    type: ADD_NOTEBOOK,
    notebook
})
export const deleteNotebook = id => ({
    type: DELETE_NOTEBOOK,
    id
})
export const editNotebook = notebook => ({
    type: EDIT_NOTEBOOK,
    notebook
})
export const setNotebookAndNotes = notebook => ({
    type: LOAD_NOTEBOOK_ALL_NOTES,
    notebook
})

//Thunk
export const getNotebooks = () => async dispatch => {
    const response = await fetch('/api/notebook_routes/');

    if (response.ok) {
        const notebooks = await response.json();
        dispatch(setNotebooks(notebooks.notebooks))
    }
};

export const getNotebookAndNotes = ({id}) => async dispatch => {
    const response = await fetch(`/api/notebook_routes/${id}/notes`);
    if (response.ok) {
        const notebooks = await response.json();
        dispatch(setNotebookAndNotes(notebooks))
    }
};


//Create a notebook
export const createNotebook = ({title, user_id}) => async(dispatch) => {
    const response = await fetch('/api/notebook_routes/newNotebook', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            title,
            user_id
         }),
    });
    if (response.ok) {
        const notebook = await response.json();
        dispatch(addNotebook(notebook))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    }
}

//Edit a notebook
export const editANotebook = ({title, user_id, id} ) => async(dispatch) => {
    const response = await fetch(`/api/notebook_routes/edit/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            id,
            title,
            user_id,
         }),
    });
    if (response.ok) {
        const notebook = await response.json();
        dispatch(editNotebook(notebook))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    }
}

//Delete notebook
export const deleteANotebook = ({id}) => async(dispatch) => {
    const response = await fetch(`/api/notebook_routes/delete/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteNotebook(id));
    }
}

const initialState = {}
//Reducer
const notebookReducer = (state=initialState, action) => {
    switch(action.type) {
         case SET_NOTEBOOKS:
            const newState = {}
            action.notebooks.forEach(notebook => {
                newState[notebook.id] = notebook
            });
            return newState
        case ADD_NOTEBOOK:
            const addNewNotebook = {...state}
            addNewNotebook[action.notebook.id] = action.notebook
            return addNewNotebook
        case DELETE_NOTEBOOK:
            const notebook = {...state}
            delete notebook[action.id]
            return notebook
        case EDIT_NOTEBOOK:
            const editNotebook = {...state}
            editNotebook[action.notebook.id] = action.notebook
            return editNotebook
        case LOAD_NOTEBOOK_ALL_NOTES:
            const loadNotesAndNotebooks = {}
            loadNotesAndNotebooks[action.notebook.notes.id] = action.notebook.notes
            action.notebook.notes.forEach(note => {
                loadNotesAndNotebooks[note.id] = note
            });
            return loadNotesAndNotebooks

        default:
            return state;
    }
}

export default notebookReducer;