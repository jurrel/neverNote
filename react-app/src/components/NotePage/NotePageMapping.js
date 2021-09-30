
function NotePageMapping({note}) {
    // const dispatch = useDispatch();
    console.log('YYYYYYYY', note)
    return(
        <>  
            <div className="server_name_bottom_bar">
                <p>
                    {note.title}
                    <div>
                        {note.content}
                    </div>
                </p>
            </div>
        </>
    )

}

export default NotePageMapping

