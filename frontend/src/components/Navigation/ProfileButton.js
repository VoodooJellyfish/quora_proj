import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { useHistory } from "react-router";

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const visitProfile = (e) => {
    e.preventDefault()
  let path = `/users/${user?.id}`
  history.push(path)
  }

  return (
    <>
      <button className="modal-button" onClick={openMenu}>
        <i className="fas fa-user-circle fa-lg" />
      </button>
      {showMenu && (
        <div className="dropdown-menu">
          <ul className="profile-dropdown">
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>
              <button className="modalButton" onClick={visitProfile}>My Profile</button>
            </li>
            <li>
              <button className="modalButton" onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;