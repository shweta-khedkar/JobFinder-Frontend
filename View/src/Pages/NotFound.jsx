import React from 'react'
import NotFoundimg from "../assets/Images/NotFound.png";
import { Link } from 'react-router-dom'
import Styles from "./NotFound.module.css";
const NotFound = () => {
  return (
    <section className={Styles.container}>
        <div className={Styles.content}>
        <img src={NotFoundimg} alt="Not Found Image"  />
        <Link to={'/'} className={Styles.bthbtn}>Return To Home</Link>
        </div>
       </section>
  )
}

export default NotFound