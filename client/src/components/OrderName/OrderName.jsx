import React from "react";
import { orderByName } from "../../redux/actions";
import { useDispatch } from "react-redux";

const OrderByName = ({ setCurrentPage, setOrder }) => {
  const dispatch = useDispatch();

  function handleOrderName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado${e.target.value}`);
  }

  return (
    <select onChange={(e) => handleOrderName(e)}>
      <option value="az">Orden A - Z</option>
      <option value="za">Orden Z - A</option>
    </select>
  );
};

export default OrderByName;
