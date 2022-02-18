import React from "react";
import { useDispatch } from "react-redux";
import { orderPopulation } from "../../redux/actions";

const OrderByPopulation = ({ setCurrentPage, setOrderPop }) => {
  const dispatch = useDispatch();

  function handleOrderPopulation(e) {
    e.preventDefault();
    dispatch(orderPopulation(e.target.value));
    setCurrentPage(1);
    setOrderPop(`Ordenado${e.target.value}`);
  }

  return (
    <select onChange={(e) => handleOrderPopulation(e)}>
      <option value="defaultPop">Poblacion</option>
      <option value="minor-major">Ver desde pais con menor poblacion</option>
      <option value="major-minor">Ver desde pais con mayor poblacion</option>
    </select>
  );
};

export default OrderByPopulation;
