const { default: axios } = require("axios");
const { Router } = require("express");
const { Sequelize, Op } = require("sequelize");
const { Country, Activities } = require("../db");
const router = Router();

//consulta a api evaluando posibles fallas y carga a la DB

const apiGetData = async () => {
  try {
    const getApi = await axios.get("https://restcountries.com/v3/all");
    const filtredCountriesApi = getApi.data?.map(async (countrie) => {
      try {
        await Country.findOrCreate({
          where: {
            idApi: countrie.cca3,
          },
          defaults: {
            idApi: countrie.cca3,
            name: countrie.name.common,
            img: countrie.flags[1],
            continent: countrie.region,
            capital: countrie.capital
              ? countrie.capital[0]
              : "Capital not found",
            subregion: countrie.subregion,
            area: countrie.area,
            population: countrie.population,
            maps: countrie.maps.googleMaps,
          },
        });
        return filtredCountriesApi;
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//ruta get que al inicializarse ya carga la funcion de apiGetData, luego si fue invocada por query
//o no lo evalua dentro y muestra el pais solicitado por query o los que coincidan con esos datos
//ingresados por URL, y si no ingreso nada por query directamente nos trae todos los paises de la
//api a nuestra DB y nos los muestra, con sus respectivas actividades

router.get("/", async (req, res) => {
  await apiGetData();
  const { name } = req.query;
  try {
    if (name) {
      const countryName = await Country.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: Activities,
      });
      countryName.length
        ? res.status(200).send(countryName)
        : res.status(404).send("Country not found");
    } else {
      const countries = await Country.findAll({
        include: [
          {
            model: Activities,
            require: true,
          },
        ],
      });
      return res.status(200).send(countries);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
});

//

router.get("/:id", async (req, res) => {
  // await apiGetData();
  const { id } = req.params;
  try {
    const idCountry = await Country.findOne({
      where: {
        idApi: id.toUpperCase(),
      },
      include: {
        model: Activities,
      },
    });
    !idCountry
    ? res.status(404).send(`El id ${id} no tiene ningun pais asociado`)
    : res.status(200).send(idCountry)
  } catch (error) {
    console.log(error)
    return res.status(404).send(`Pais no encontrado`, error);
  }
});

router.post('/', async (req,res,next) => {
  try {
  const {idApi, name, img, continent, capital, subregion, area, population} = req.body;
  const country = await Country.create({
      idApi: idApi,
      name: name,
      img: img,
      continent: continent,
      capital:capital,
      subregion: subregion,
      area: area,
      population: population
  })
  return res.status(200).json(country)
} catch (error) {
  next (error)  
}
  
  
})

module.exports = router;
