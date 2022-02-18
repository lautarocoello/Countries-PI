import React from "react";
import { useDispatch } from "react-redux";
import { filteredContinent } from "../../redux/actions";

const FilteredContinent = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  function handleFilteredContinent(e) {
    dispatch(filteredContinent(e.target.value));
    // console.log(e.target.value);
  }

  return (
    <div>
      <select onChange={(e) => handleFilteredContinent(e)}>
        <option value="All">Todos</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctic">Antarctic</option>
      </select>
    </div>
  );
};

export default FilteredContinent;
