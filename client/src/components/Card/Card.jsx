import React from "react";
import { Link } from "react-router-dom";
import styles from "../Card/Card.module.css";

const Card = ({ idApi, name, continent, img }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <h4>{name}</h4>
        <Link to={"/home/" + idApi}>
          <img src={img} alt={name} className={styles.img} />
        </Link>
        <h5>{continent}</h5>
      </div>
    </div>
  );
};

export default Card;
