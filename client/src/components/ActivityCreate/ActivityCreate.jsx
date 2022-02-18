import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postActivity, getActivities, getCountries } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import style from '../ActivityCreate/ActivityCreate.module.css'



const CreateActivity = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const acts = useSelector((state) => state.activities)

  const history = useHistory();
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
  }

  function handleSubmit(e) {
    if (
      input.countries.length <= 0 ||
      !input.name ||
      !input.difficulty ||
      !input.duration ||
      !input.season
    ) {
      e.preventDefault();
      alert("Complete todos los campos para crear la actividad");
    } else if (acts.includes(input.name)){
      alert('Actividad creada, intente con otro nombre')
    }
    else{
      e.preventDefault();
      dispatch(postActivity(input));
      alert("Actividad creada con exito");
      history.push("/home");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: ["Verano", "Otoño", "Invierno", "Primavera"],
        countries: "",
      });
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((country) => country !== e),
    });
  }

  return (
    <div className={style.divForm}>
      <h1>Crear actividad</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <div className={style.label}>
          <label>Nombre de la actividad: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="¿Que actividad realizo?"
            onChange={(e) => handleChange(e)}
          />
        </div>

        
          <label>Dificultad de la actividad</label>
          <div className={style.caja}>
            <select
            name="difficulty"
            onChange={(e) => handleChange(e)}
            value={input.difficulty}
          >
            <option value="">Seleccione dificultad de la actividad</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <label>Duracion en minutos</label>
          <input
            type="number"
            min="20"
            max="300"
            value={input.duration}
            name="duration"
            placeholder="Min 20 - Max 300"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Temporada</label>
          <div>
            <label>
              <input
                type="radio"
                name="season"
                value="Verano"
                onChange={(e) => handleCheck(e)}
              />
              Verano
            </label>
            <label>
              <input
                type="radio"
                name="season"
                value="Otoño"
                onChange={(e) => handleCheck(e)}
              />
              Otoño
            </label>
            <label>
              <input
                type="radio"
                name="season"
                value="Invierno"
                onChange={(e) => handleCheck(e)}
              />
              Invierno
            </label>
            <label>
              <input
                type="radio"
                name="season"
                value="Primavera"
                onChange={(e) => handleCheck(e)}
              />
              Primavera
            </label>
          </div>
        </div>

        <div>
          <br />
          <label>Pais</label>
          <div>
            <br />
            <select onChange={(e) => handleSelect(e)} name="countries" className={style.caja}>
              <option>Seleccione pais donde realizo la actividad</option>
              {countries.map((c) => (
                <option key={c.name} value={c.idApi}>
                  {c.name}
                </option>
              ))}
            </select>
                  {/* {console.log(countries)} */}
            {input.countries.map((country) => (
              <div key={country} className={style.buttonDelete}>
                <h5>{country}</h5>
                <button type="button" onClick={() => handleDelete(country)}>
                  X
                </button>
              </div>
            ))}

            <button type="submit" className={style.buttonCreate}>Crear actividad</button>
          </div>
        </div>
      </form>

      <Link to="/home">
      <div className={style.divIngreso}></div>
      </Link>
    </div>
  );
};

export default CreateActivity;
