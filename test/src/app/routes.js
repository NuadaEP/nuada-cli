const { Router } = require('express');
const controllers = require('./app/controllers');

const routes = Router();

routes.get('/sample', controllers.SampleController.index);
routes.get('/sample/:id', controllers.SampleController.show);
routes.post('/sample', controllers.SampleController.store);
routes.put('/sample/:id', controllers.SampleController.update);
routes.delete('/sample/:id', controllers.SampleController.delete);

module.exports = routes;
