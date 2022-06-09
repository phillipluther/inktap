import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import { createRoutes } from '@src/utils';
import { loginRouter } from '@src/login';
import userModel from '@src/users/user.model';

const options = {
  isProd: process.env.node_env === 'production',
  host: 'http://localhost',
  port: 8002,
};

const app = express();

app.disable('x-powered-by');
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan(options.isProd ? 'common' : 'dev'));

app.use('/login', loginRouter);

createRoutes(app).then(async (routedApp) => {
  if (!routedApp) {
    console.error('[inktap-api]', 'Failed to start Inktap; check the debugging logs above');
    return;
  }

  /**
   * TODO: hard-coding an admin user for development; reconcile this
   */
  await userModel.createOne({
    email: 'admin@admin.com',
    password: 'password',
  });

  // catch-all route for anything not handled above
  routedApp.use('*', (req, res) => {
    userModel.getMany().then((a) => {
      console.log(a);
    });

    res.status(401).json({
      success: false,
      data: 'Method not supported',
    });
  });

  routedApp.listen(options.port, () => {
    console.log(`[inktap-api] Listening at ${options.host}:${options.port}`);
  });
});
