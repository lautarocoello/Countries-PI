import React from "react";
import styles from '../Paginate/Paginate.module.css'

const Paginate = ({ countriesPage, allCountries, paginado }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPage); i++) {
    pageNumbers.push(i);
  }
  //   console.log(pageNumbers)

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {pageNumbers?.map((number) => (
          <button onClick={() => paginado(number)} key={number} className={styles.button}>
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
