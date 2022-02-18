import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryById, clearDetail } from "../../redux/actions";
import { useEffect } from "react";
import style from '../CountrieDetail/CountrieDetail.module.css'
import image from '../../images/loading.gif'
import imageActs from '../../images/images-activities.png'


const DetailCountries = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailCountry = useSelector((state) => state.countriesDetail);


  useEffect(() => {
    dispatch(getCountryById(id));
    dispatch(clearDetail([]))
  }, [dispatch, id]);


  if(detailCountry.length > 2 || detailCountry.length < 1) {
    return (
    <div>
          <img src={image} alt="...loading" className={style.loading} />
    </div>)
  }

  return (
    <div className={style.container}>
     <Link to="/home">
      <div className={style.divIngreso}>
      </div>
      </Link>
      <div id={style.details}>
      <div>
        <img src={detailCountry.img} alt="flag"  className={style.img}/>
      </div>
      <div>
        <h1>Pais: {detailCountry.name}</h1>
        <h2>Continente: {detailCountry.continent}</h2>
        <h3>Capital: {detailCountry.capital}</h3>
        <h4>Subregion: {detailCountry.subregion}</h4>
        <h4>Habitantes: {detailCountry.population}</h4>
        <h4>Area: {detailCountry.area}</h4>
        <a href={detailCountry.maps} target="_blank"rel="noreferrer">Ubicacion en el mapa</a>
      </div>
      </div>

      <div>
        {detailCountry.activities && (
          detailCountry.activities.length === 0 ? (
            <div>
              <p>Este pais no tiene actividades creadas</p>
              <p>Desea añadir alguna?</p>
            </div>
          ) : (
            detailCountry.activities.map((act) => (
              <div key={act.id} id={style.activities}>
                <h2>Actividad:  {act.name}</h2>
                <h4>Dificultad: Nivel {act.difficulty}, actividad para hacer en {act.season}</h4>
                <h4>Duracion de actividad: {act.duration} minutos</h4>                             
              </div>
            ))
            )
          
        ) 
        }
        <Link to="/activities">
            <button className={style.buttonAdd}>Añadir actividad</button>
          </Link>
      </div>
      <div>
        <img src={imageActs} alt="activities" className={style.imageActs}/>
      </div>
    </div>
  );
};

export default DetailCountries;
