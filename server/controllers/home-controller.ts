import { Request, Response, NextFunction } from 'express';

function homepage(req: Request, res: Response, next: NextFunction) {
  res.render('layout.njk', {
    serviceName: 'Check local air quality',
    page: 'homepage',
  });
}

function login(req: Request, res: Response, next: NextFunction) {
  res.render('login.njk', { serviceName: '' });
}

export default { homepage, login };
