import { Router } from 'express';

import ReadfilesController from '../controllers/ReadfilesController';

const ReadfilesRoutes = Router();
const Readfiles = new ReadfilesController();

ReadfilesRoutes.('/readfiles', Readfiles.);
ReadfilesRoutes.('/readfiles/:id', Readfiles.);
ReadfilesRoutes.('/readfiles', Readfiles.);
ReadfilesRoutes.('/readfiles/:id', Readfiles.);
ReadfilesRoutes.('/readfiles/:id', Readfiles.);

export default ReadfilesRoutes;
