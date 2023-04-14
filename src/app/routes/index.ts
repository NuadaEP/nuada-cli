import { Router } from 'express';

import SampleRoutes from './sample.router';


const routes = Router();

routes.use(SampleRoutes);


export default routes;
