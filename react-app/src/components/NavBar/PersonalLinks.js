
import { NavLink } from 'react-router-dom';
function PersonalLinks() {

    return(
        <>

            <h1>
                <a  className="personal-links-sidebar" href='https://github.com/jurrel/neverNote'>
                    <i className="fa fa-github">Github</i>
                </a> 
            </h1>
            <h1 >
                <a  className="personal-links-sidebar" href='https://www.linkedin.com/in/gerryle/'>
                    <i className="fa fa-linkedin">LinkedIn</i>
                </a> 
            </h1>
        </>
    )
}

export default PersonalLinks;
