import { NavLink } from 'react-router-dom';
import './splashPage.css'
import splash from  '../../assets/splash.png'
function SplashPage() {
  return (
    <>
        <div className="slogan">
            <h1>TURN NEVER INTO FOREVER!</h1>
            {/* <h3>Remember everything you need to remember while allowing you to forget whatever you want to forget </h3>
            <h3>If it is not written down it must not be important</h3> */}
            <NavLink  to ='/signUp' exact = {true}>
                <button className='sign-up-for-free-button'>Sign up for free</button>
            </NavLink>
            <NavLink to ='/login' exact = {true}>
                Already have an account? Log in
            </NavLink>
        </div>
        <div className="hero-section">
            <img  className='splash-photo'src={splash} alt=""/>
            <div className='splash-text'>
                <div className='splash-page-middle-text'>
                    <h3>WORK ANYWHERE</h3>
                    <p>Keep important notes handy</p>
                </div>
                <div className='splash-page-middle-text'>
                    <h3>NEVER FORGET ANYTHING</h3>
                    <p>Keep important notes handy</p>
                </div>
                <div className='splash-page-middle-text'>
                    <h3>Have bad memory?</h3>
                    <p>We got you covered</p>
                </div>
            </div>
        </div>
        
    </>
    )
}

export default SplashPage;
