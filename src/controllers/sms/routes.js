import { Router } from 'express';
import * as SmsController from './controller';

const routes = new Router();

routes.get('/config.json', SmsController.getConfig);
routes.get('/config.js', SmsController.getConfig);  
routes.get('/ui', SmsController.editModalPage);
routes.get('/ui/edit', SmsController.editModalPage);
routes.get('/ui/config', SmsController.editModalPage);
routes.get('/ui/modal', SmsController.runnungModalPage);
routes.get('/ui/    ', SmsController.runnungHoverPage);
routes.post('/execute', SmsController.execute);
routes.post('/save', SmsController.save);
routes.post('/publish', SmsController.publish);
routes.post('/validate', SmsController.validate);
routes.post('/stop', SmsController.stop);

export default routes;