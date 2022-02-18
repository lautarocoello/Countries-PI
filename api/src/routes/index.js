// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const { Sequelize } = require('sequelize');
const activitiesRoute = require('./activities');
const countrieRoute = require ('./countries')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/activities', activitiesRoute);
router.use('/countries', countrieRoute);


module.exports = router;
