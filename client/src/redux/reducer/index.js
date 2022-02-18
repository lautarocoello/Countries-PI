import {
  GET_COUNTRIES,
  FILTERED_CONTINENT,
  ORDER_NAME,
  ORDER_POPULATION,
  GET_COUNTRY_BY_NAME,
  CREATE_ACTIVITY,
  GET_ALL_ACTIVITIES,
  FILTER_BY_ACTIVITY,
  GET_COUNTRY_BY_ID,
  CLEAR_DETAIL
} from "../actions";

const initialState = {
  countries: [],
  countriesDetail: [],
  activities: [],
  activitiesCreate: []
  
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesDetail: action.payload,
      };

      
      case ORDER_NAME:
        const countriesOrder =
        action.payload === "az"
          ? state.countries.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (b.name > a.name) return -1;
            return 0;
          })
          : state.countries.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (b.name > a.name) return 1;
            return 0;
          });
          return {
        ...state,
        countries: countriesOrder,
      };

    case ORDER_POPULATION:
      const populationOrder =
      action.payload === "minor-major"
      ? state.countries.sort((a, b) => {
        if (a.population > b.population) return 1;
        if (b.population > a.population) return -1;
              return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.population > b.population) return -1;
              if (b.population > a.population) return 1;
              return 0;
            });
            return {
              ...state,
              countries: populationOrder,
      };

    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };


      case CREATE_ACTIVITY:
        return {
        ...state,
        activitiesCreate: action.payload,
      };

      case GET_ALL_ACTIVITIES:
        return {
          ...state,
          activities: action.payload,
          activitiesCreate: action.payload,
        };
        
      case FILTERED_CONTINENT:
        const allCountries = state.countriesDetail;
        const continentFiltered =
          action.payload === "All"
            ? allCountries
            : allCountries.filter((el) => el.continent === action.payload);
  
        return {
          ...state,
          countries: continentFiltered,
        };

    case FILTER_BY_ACTIVITY:
      const countriesAct = state.countriesDetail;
      console.log(state.activities,'esto es del reducer')
      let activityFiltered = action.payload === 'none'  ?
      countriesAct : 
      countriesAct.filter((act) => act.activities && act.activities.map((e) => e.name).includes(action.payload))
      // // console.log(activityFiltered,'activity filtered')
      // const activity = state.activities;
      // const activityFiltered = action.payload === 'none' ?
      // activity : activity.forEach(act => console.log(act,'esto papaaa dale que sale'))

       return {
      ...state,
      countries: activityFiltered
    }

    case GET_COUNTRY_BY_ID: 
      return {
        ...state,
        countriesDetail: action.payload,
      };
    
    
    case CLEAR_DETAIL:
      return {
        ...state,
        countriesDetail: []

      }
    
        
    default:
      return state;
  }
}

export default reducer;
