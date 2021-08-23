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
          <NavLink exact to="/"><i className="fas fa-home fa-lg"></i></NavLink>
          {isLoaded && sessionLinks}
          <div className="about">
        <a href="https://github.com/VoodooJellyfish">About Me</a>
      </div>
    </div>
  );
}

export default Navigation;