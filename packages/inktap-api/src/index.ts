import express from 'express';
import { json, urlencoded } from 'body-parser';
import postRoutes from './resources/posts/posts.routes';

const options = {
  isProd: process.env.node_env === 'production',
  host: 'http://localhost',
  port: 8001,
};

const app = express();

app.disable('x-powered-by');
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/posts', postRoutes);

app.use('*', (req, res) => {
  res.status(401).send({
    message: 'Method not supported',
  });
});

app.listen(options.port, () => {
  console.log(`[inktap-api] Listening at ${options.host}:${options.port}`);
});
