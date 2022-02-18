import React from "react";
import { Link } from "react-router-dom";
import styles from '../Landing/LandingPage.module.css'

// console.log(styles)

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      <h1 className={styles.h1}>datos de paises</h1>
      <Link to="/home">
       <div className={styles.divIngreso}></div>
      </Link>
    </div>
  );
};

export default LandingPage;
/*

<!-- HTML !-->
<button class="button-80" role="button">Button 80</button>

/* CSS */
