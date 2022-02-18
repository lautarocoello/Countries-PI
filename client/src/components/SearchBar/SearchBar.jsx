import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/actions";
import style from '../SearchBar/SearchBar.module.css';

const GetCountryByName = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setCountry(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountryByName(country));
    setCountry("");
  }
  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Buscar pais"
        value={country}
        onChange={(e) => handleInputChange(e)}
        className={style.inputSearch}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)} className={style.buttonSearch}>
       Buscar
      </button>
    </div>
  );
};

export default GetCountryByName;
