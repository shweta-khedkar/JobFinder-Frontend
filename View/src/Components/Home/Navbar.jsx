import React from 'react';
import styles from "./Navbar.module.scss";
import { useAuth } from '../../Context/UserContext';
import {MdAccountCircle} from "react-icons/md";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const {user: {name, isAuth}, logout} = useAuth();

    const handleLogout = ()=> {
      localStorage.removeItem("accessToken");
      logout();
    }
  return (
    <div className={`${styles.nav_bar}`}>
    <nav>
        <Link className={`${styles.logo}`} to={'/'} style={{textDecoration:"none",fontSize: "1.5rem",
            fontWeight: 700}}>JobFinder</Link>

    
      {!isAuth ? (
        <ul className={`${styles.no_auth}`}>
          <li>
            <Link to={"/signin"} style={{color: "#FFF"}}>Login</Link>
          </li>
          <li>
            <Link to={"/signup"} style={{color: "var(--dark-pink)", backgroundColor: "#FFF"}}>Register</Link>
          </li>
        </ul>
      ) : (
        <ul className={`${styles.auth}`}>
          <li onClick={handleLogout}>Logout</li>
          <li>
            Hello {name}
            <Link to={'/profile'} className={`${styles.profile_img}`}><MdAccountCircle/></Link>
          </li>
        </ul>
      )}
    </nav>
  </div>
  )
}

export default Navbar