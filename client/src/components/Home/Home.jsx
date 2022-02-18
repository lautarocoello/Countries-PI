import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries } from "../../redux/actions/index.js";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import FilteredContinent from "../Filtered Continent/FilteredContinent.jsx";
import OrderByName from "../OrderName/OrderName.jsx";
import OrderByPopulation from "../OrderPopulation/OrderPopulation.jsx";
import Paginate from "../Paginate/Paginate.jsx";
import GetCountryByName from "../SearchBar/SearchBar.jsx";
import FilterActivities from "../FilterActivities/FilterActivities.jsx";
import styles from "../Home/Home.module.css";
import image from "../../images/loading.gif";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPage] = useState(10);
  const [, setOrder] = useState("");
  const [, setOrderPop] = useState("");

  const lastCountrie = currentPage * countriesPage; //10
  const firstCountrie = lastCountrie - countriesPage; // 0
  const currentCountries = allCountries.slice(firstCountrie, lastCountrie);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!allCountries.length) {
    return (
      <div>
        <img src={image} alt="...loading" className={styles.loading} />
      </div>
    );
  }

  function handleClick(c) {
    c.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div className={styles.divHome}>
      
  
      <button
        onClick={(c) => {
          handleClick(c);
        }}
        className={styles.buttonRechargue}
      >
        Volver a cargar paises
      </button>
      <nav className={styles.navHome}>
      <div>
      <GetCountryByName />
      </div>
      
        <div>
        <OrderByPopulation
          setCurrentPage={setCurrentPage}
          setOrderPop={setOrderPop}
        />
        </div>
        <div>
        <OrderByName setCurrentPage={setCurrentPage} setOrder={setOrder} />
        </div>
        <div>
        <FilteredContinent setCurrentPage={setCurrentPage} />
        </div>
        <div>
        <FilterActivities setCurrentPage={setCurrentPage} />
        </div>        
    </nav>
    <Link to="/activities">
            <button className={styles.buttonCreate}>
              Crear actividad turistica
            </button>
          </Link>
        <div className={styles.card}>
          {currentCountries.map((el) => {
            return (
              <Card
                key={el.idApi}
                idApi={el.idApi}
                name={el.name}
                continent={el.continent}
                img={el.img}
              />
            );
          })}
        </div>
        <div className={styles.paginate}>
          <Paginate
            countriesPage={countriesPage}
            allCountries={allCountries.length}
            paginado={paginado}
          />
        </div>
      
    </div>
  );
}
