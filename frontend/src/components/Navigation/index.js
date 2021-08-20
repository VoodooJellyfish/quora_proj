import React from 'react';
import { NavLink, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  // const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);



  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
        
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup"><i className="fas fa-user-plus"></i></NavLink>
        {/* <form onSubmit={handleSubmit}>

        </form> */}
      </>
    );
  }

  return (
    <div className="navbar">
      {/* <ul className="navlist">
        <li> */}
          <NavLink exact to="/"><i className="fas fa-home"></i></NavLink>
          {isLoaded && sessionLinks}
        {/* </li>
      </ul> */}
    </div>
  );
}

export default Navigation;