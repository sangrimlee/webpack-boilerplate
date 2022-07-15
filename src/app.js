import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.use(express.static(path.join(process.cwd(), 'dist')));
} else {
  app.use(
    webpackDevMiddleware(webpack(webpackConfig), {
      publicPath: webpackConfig.output.publicPath,
    })
  );
}

export default app;
