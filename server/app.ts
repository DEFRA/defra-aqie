import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import searchLocationRouter from './routes/search-location';
import nunjucks from 'nunjucks';
var app = express();
// Configure Express to serve static files from the 'assets' directory
// const assets = [
//   '/dist/public/stylesheets',
//   '/node_modules/govuk-frontend/govuk/assets',
//   '/node_modules/govuk-frontend/dist',
// ];
// assets.forEach((dir) => {
//   app.use('/assets', express.static(path.join(process.cwd(), dir)));
// });

// Configure Nunjucks
nunjucks.configure(['server/views', 'node_modules/govuk-frontend/dist'], {
  autoescape: true,
  express: app,
  watch: true,
});
app.engine('njk', nunjucks.render);
app.set('view engine', 'njk');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/search-location', searchLocationRouter);
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
export default app;
