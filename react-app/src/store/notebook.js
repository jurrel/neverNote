//constnant
const LOAD_ALL_NOTEBOOKS = 'notebook/LOAD';
const ADD_NOTEBOOK = 'notebook/ADD';
const DELETE_NOTEBOOK = 'notebook/DELETE';
const EDIT_NOTEBOOK = 'notebook/EDIT';
const LOAD_NOTEBOOK_ALL_NOTES = 'notebook/LOAD_NOTEBOOK_ALL_NOTES';

//action creator
export const loadAllNotebooks = notebooks => ({
    type: LOAD_ALL_NOTEBOOKS,
    notebooks
})

export const addNotebook = notebook => ({
    type: ADD_NOTEBOOK,
    notebook
})
export const deleteNotebook = notebook => ({
    type: DELETE_NOTEBOOK,
    notebook
})
export const editNotebook = notebook => ({
    type: EDIT_NOTEBOOK,
    notebook
})
export const getNotebookAndNotes = notebook => ({
    type: LOAD_NOTEBOOK_ALL_NOTES,
    notebook
})

//Thunk
export const loadAllNotebooksT = () => async dispatch => {
    const response = await fetch(`/api/notebook_routes/`);

    if (response.ok) {
        const notebooks = await response.json();
        dispatch(loadAllNotebooks(notebooks))
    }
};

export const notebookAndNotes = (id) => async dispatch => {
    const response = await fetch(`/api/notebook_routes/${id}/notes`)
    const data = await response.json()
    dispatch(getNotebookAndNotes(data))
}


//Create a notebook, WORKING THUNK
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
    console.log({response: {title, user_id}})
    if (response.ok) {
        const notebook = await response.json();
        dispatch(addNotebook(notebook))
    }
}

//Edit a notebook, WORKING THUNK
export const editANotebook = ({title, user_id, id} ) => async(dispatch) => {
    const response = await fetch(`/api/auth/edit/${id}`, {
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
    }
}
///////////////////////////////////////////////////////////

//Delete  a notebook
export const deleteANotebook = ({id}) => async(dispatch) => {
    const response = await fetch(`/api/auth/delete/${id}`, {
        method: "DELETE"
    })
    console.log({response})

    // const deleteSingleNotebook = await response.json();
    // dispatch(deleteNotebook(deleteSingleNotebook))
}

    









//Reducer
const notebookReducer = (state={}, action) => {
    let newState = {...state}
    switch(action.type) {
        case LOAD_ALL_NOTEBOOKS:
            newState = {...action.journals}
            return newState
        case ADD_NOTEBOOK:
            const addNewNotebook = {...state}
            addNewNotebook[action.notebook.id] = action.notebook
            return addNewNotebook
        case DELETE_NOTEBOOK:
            const notebook = {...state}
            delete notebook[action.notebook]
            return notebook
        case EDIT_NOTEBOOK:
            const editNotebook = {...state}
            editNotebook[action.notebook.id] = action.notebook
            return editNotebook
        default:
            return state;
    }
}

export default notebookReducer;