[
  'MAILER_PASSWORD',
  'MAILER_FROM',
  'MAILER_USER',
  'APIKEY_EXTENSION_DAYS',
  'APIKEY_EXP_DAYS',
  'CLIENT_ID'
 ].forEach(e => { if (!process.env[e]) throw Error(`${e} missing`); });

import * as express from 'express';
import { Application } from 'express';
import * as createMiddleware from 'swagger-express-middleware';
import { SwaggerMiddleware } from 'swagger-express-middleware';
import { authentication } from './lib/authentication';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../config/swagger.json';
import { router } from './app/routers';

const app: Application = express();

createMiddleware('config/swagger.json', app, (err, middleware: SwaggerMiddleware) => {
  if (err) {
    console.log(err);
  }

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(middleware.metadata());
  app.use(middleware.CORS());
  app.use(middleware.parseRequest());
  app.use(middleware.validateRequest());

  app.use(express.json());
  const { PORT = 3000 } = process.env;

  app.use(authentication);
  app.use(router);

  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
});