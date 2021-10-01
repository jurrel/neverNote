
import { NavLink } from 'react-router-dom';
function PersonalLinks() {

    return(
        <>

            <h1>
                <a  className="personal-links-sidebar" href='https://github.com/jurrel/neverNote'>
                    <i class="fa fa-github">Github</i>
                </a> 
            </h1>
            <h1 >
                <a  className="personal-links-sidebar" href='https://www.linkedin.com/in/gerryle/'>
                    <i class="fa fa-linkedin">LinkedIn</i>
                </a> 
            </h1>
        </>
    )
}

export default PersonalLinks;
