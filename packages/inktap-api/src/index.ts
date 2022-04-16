import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import postRoutes from './resources/posts/posts.routes';
// import tagRoutes from './resources/tags/tags.routes';

const options = {
  isProd: process.env.node_env === 'production',
  host: 'http://localhost',
  port: 8001,
};

const app = express();

app.disable('x-powered-by');
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan(options.isProd ? 'common' : 'dev'));

app.use('/posts', postRoutes);
// app.use('/tags', tagRoutes);

app.use('*', (req, res) => {
  res.status(401).send({
    message: 'Method not supported',
  });
});

app.listen(options.port, () => {
  console.log(`[inktap-api] Listening at ${options.host}:${options.port}`);
});
