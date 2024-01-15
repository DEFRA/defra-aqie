import { Request, Response, NextFunction } from 'express';

function nitrogenDioxide(req: Request, res: Response, next: NextFunction) {
  res.render('pollutants/nitrogen-dioxide.njk', {
    serviceName: 'Check local air quality',
  });
}

function ozone(req: Request, res: Response, next: NextFunction) {
  res.render('pollutants/ozone.njk', {
    serviceName: 'Check local air quality',
  });
}

function particulateMatter2(req: Request, res: Response, next: NextFunction) {
  res.render('pollutants/particulate-matter2.njk', {
    serviceName: 'Check local air quality',
  });
}

function particulateMatter10(req: Request, res: Response, next: NextFunction) {
  res.render('pollutants/particulate-matter10.njk', {
    serviceName: 'Check local air quality',
  });
}

function sulphurDioxide(req: Request, res: Response, next: NextFunction) {
  res.render('pollutants/sulphur-dioxide.njk', {
    serviceName: 'Check local air quality',
  });
}

export default {
  nitrogenDioxide,
  ozone,
  particulateMatter2,
  particulateMatter10,
  sulphurDioxide,
};
