import './notebook.css'

function NotebookMap({notebook, setSelectedNotebook}) {
    return(
        <>  
            <div className="middle-content" onClick={(e) => setSelectedNotebook(notebook.id)}>
                <p className="tests" >
                    {notebook.title}
                </p>
            </div>

        </>
    )

}

export default NotebookMap

