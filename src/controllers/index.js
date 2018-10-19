import { Router } from 'express';
import { AccountRoutes } from './account';
import { SmsRoutes } from './sms';

const routes = new Router();

routes.use('/account', AccountRoutes);
routes.use('/sms', SmsRoutes);

export default routes;