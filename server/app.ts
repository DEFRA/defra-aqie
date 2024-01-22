import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import homeRouter from './routes/home-route';
import searchLocationRouter from './routes/search-location-route';
import locationRouter from './routes/location-route';
import locationDetailsRouter from './routes/location-details-route';
import ozoneRouter from './routes/ozone-route';
import nitrogenDioxideRouter from './routes/nitrogen-dioxide-route';
import particulateMatter10Router from './routes/particulate-matter10-route';
import particulateMatter2Router from './routes/particulate-matter2-route';
import sulphurDioxideRouter from './routes/sulphur-dioxide-route';
import termsAndConditionsRouter from './routes/terms-and-conditions-route';
import privacyRouter from './/routes/privacy-route';
import cookiesRouter from './routes/cookies-route';
import accessibilityRouter from './routes/accessibility-route';
import feedbackRouter from './routes/feedback-route';

import nunjucks from 'nunjucks';
import session from 'express-session';
import crypto from 'crypto';
import addViewFilters from './utils/add-view-filters';

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
// Session setup
const secret = crypto.randomBytes(256).toString('hex');
app.use(
  session({
    name: 'user_id',
    secret: process.env.SECRET || secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Max age one day
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  })
);
// Configure Nunjucks
const env = nunjucks.configure(
  ['server/views', 'node_modules/govuk-frontend/dist'],
  {
    autoescape: true,
    express: app,
    watch: true,
  }
);
addViewFilters(env);

app.engine('njk', nunjucks.render);
app.set('view engine', 'njk');
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', homeRouter);
app.use('/search-location', searchLocationRouter);
app.use('/location', locationRouter);
app.use('/location/:id', locationDetailsRouter);
app.use('/pollutants/ozone', ozoneRouter);
app.use('/pollutants/nitrogen-dioxide', nitrogenDioxideRouter);
app.use('/pollutants/sulphur-dioxide', sulphurDioxideRouter);
app.use('/pollutants/particulate-matter2', particulateMatter2Router);
app.use('/pollutants/particulate-matter10', particulateMatter10Router);
app.use('/terms-and-conditions', termsAndConditionsRouter);
app.use('/privacy', privacyRouter);
app.use('/cookies', cookiesRouter);
app.use('/accessibility', accessibilityRouter);
app.use('/feedback', feedbackRouter);

export default app;
