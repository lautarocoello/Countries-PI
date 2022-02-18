const { Router } = require("express");
const { Sequelize } = require("sequelize");
const { Activities, Country } = require("../db");
// const Country = require("../models/Country");

const router = Router();

//realizamos un post de nuestra actividad nueva con todos los valores requeridos desde el back

// router.post("/activity", async (req, res) => {
//   try{
//   const { name, difficulty, duration, season, countryId } = req.body;
//   if(name && difficulty && duration && season ){
//     const activityId = await Activities.create({
//     name,
//     difficulty,
//     duration,
//     season,
//   });

//   const countryDb = await Country.findOne({
//     where: {
//       idApi: countryId,
//     },
//   });
//   activityId.addCountry(countryDb);
//   res.status(200).json(activityId);}
//   else {
//     res.send("Faltan parametros para las actividades")
//   }
// }catch(error){
//   console.log(error,'<= aca taaa')
// }
// });

router.post("/activity", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    if (name && difficulty && duration && season) {
      const activityId = await Activities.create({
        name,
        difficulty,
        duration,
        season 
      });

      countries.forEach(async (country) => {
        const countryDb = await Country.findOne({
          where: {
            idApi: country,
          },
        });
        await activityId.addCountry(countryDb);
      });
      res.status(200).json(activityId);
    } else {
      res.send("Faltan parametros para las actividades");
    }
  } catch (error) {
    console.log(error, "<= aca taaa");
  }
});

router.get("/", async (req, res) => {
  let activities = [];
  return Activities.findAll()
    .then((acts) => {
      acts.forEach((act) => activities.push(act.name));
      res.send(activities);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

module.exports = router;
