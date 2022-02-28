import axios from "axios";


export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const ORDER_NAME = "ORDER_NAME";
export const FILTERED_CONTINENT = "FILTERED_CONTINENT";
export const ORDER_POPULATION = "ORDER_POPULATION";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const CLEAR_DETAIL = 'CLEAR_DETAIL'

export const getCountries = () => (dispatch) => {
  return axios
    .get("http://localhost:3001/countries")
    .then((countries) => {
      dispatch({
        type: GET_COUNTRIES,
        payload: countries.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

//                                value desde el componente
export const filteredContinent = (payload) => {
  return {
    type: FILTERED_CONTINENT,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};

export const orderPopulation = (payload) => {
  return {
    type: ORDER_POPULATION,
    payload,
  };
};

export const getCountryByName = (name) => (dispatch) => {
  return axios
    .get(`http://localhost:3001/countries?name=${name}`)
    .then((countryName) => {
      dispatch({
        type: GET_COUNTRY_BY_NAME,
        payload: countryName.data,
      });
    })
    .catch((error) => {
      console.log(error);
      return alert ('Pais no encontrado')
    });
};

export const getActivities = () => async (dispatch) => {
  try {
    const acts = await axios
      .get(`http://localhost:3001/activities/`);
    dispatch({
      type: GET_ALL_ACTIVITIES,
      payload: acts.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postActivity = (payload) => {
  console.log(payload,'esto llega al payde activi')
  return async (dispatch) => {
    let postAct = await axios.post(`http://localhost:3001/activities/activity`, payload)
    return dispatch ({
      type: CREATE_ACTIVITY,
      payload: postAct
    })
  }
}



export const filterActivity = (payload) => {
  console.log(payload,'la de la actionnnn')
  return {
    type: FILTER_BY_ACTIVITY,
    payload
  }
}


export const getCountryById = (id) => (dispatch) => {
  return axios.get(`http://localhost:3001/countries/${id}`)
    .then((countriesId) => {
      dispatch({
        type: GET_COUNTRY_BY_ID,
        payload: countriesId.data,
      });
    })
    .catch((error) => {
      console.log(error)
      alert('Pais no encontrado')
      return dispatch({type:GET_COUNTRIES, payload: []})
    })
};

export const clearDetail = () => (dispatch) => {
  dispatch({
    type: CLEAR_DETAIL
  })
}



// export const getCountryById = (id) => async (dispatch) => {
//   try {
//     const countriesId = await axios.get(`http://localhost:3001/countries/${id}`);
//     dispatch({
//       type: GET_COUNTRY_BY_ID,
//       payload: countriesId.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
