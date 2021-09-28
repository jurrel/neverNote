import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import {createNotebook, editANotebook, deleteANotebook } from './store/notebook'
import {createNote } from './store/note'
import * as notebookActions from './store/notebook';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.createNotebook = createNotebook;
  window.editANotebook = editANotebook;
  window.deleteANotebook = deleteANotebook;
  window.createNote = createNote;
  window.notebookActions = notebookActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
