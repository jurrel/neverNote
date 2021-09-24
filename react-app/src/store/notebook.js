//constnant
const LOAD_ALL_NOTEBOOKS = 'comment/LOAD';
const ADD_NOTEBOOK = 'comment/ADD';
const DELETE_NOTEBOOK = 'comment/DELETE';
const EDIT_NOTEBOOK = 'comment/EDIT';

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

//Thunk
export const loadAllNotebooksT = () => async dispatch => {
    const response = await fetch(`/api/auth`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(loadAllNotebooks(comments))
    }
};

//Create a notebook, WORKING THUNK
export const createNotebook = (title, user_id) => async(dispatch) => {
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
    // if (response.ok) {
    //     const notebook = await response.json();
    //     dispatch(addNotebook(notebook))
    console.log({response: {title, user_id}})
    // console.log(response)
    // }
}

export const editANotebook = (title, user_id, id ) => async(dispatch) => {
    const response = await fetch(`/api/auth/edit/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            id,
            title: title['title'],
            user_id,
         }),
    });
    // console.log("this is title['title]",title['title'])
    // console.log("this is title",title)
    // console.log("this is title[][]",title['title']['title'])
    console.log({response: {title,user_id, id}})
}
        
//     console.log({response: {title, user_id}})
//     // console.log(response)
// }

//Reducer
const notebookReducer = (state={}, action) => {
    switch(action.type) {
        case LOAD_ALL_NOTEBOOKS:
            const allNotebooks = {...action.notebooks}
            return {...allNotebooks,...state}
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