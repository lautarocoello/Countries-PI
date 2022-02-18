import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { filterActivity } from "../../redux/actions"; 

const FilterActivities = ({setCurrentPage}) => {
    const dispatch = useDispatch();
    const activitiesCreate = useSelector((state) => state.activities)
    // console.log(activitiesCreate)


    function handleFilter(e){
        e.preventDefault();
        dispatch(filterActivity(e.target.value));
        setCurrentPage(1);
    }

 
    return (
        <div>
            <select onChange= {(e) => handleFilter(e)}>
                <option value='none'>Seleccione actividad</option>
              
                {activitiesCreate && activitiesCreate.map(act => {
                    return (
                        <option key={act} value={act}>
                            {act} </option>
                    )})}
            </select>
        </div>

    )
    
}

export default FilterActivities