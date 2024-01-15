import { Request, Response, NextFunction } from 'express';

function homepage(req: Request, res: Response, next: NextFunction) {
  res.render('layout.njk', { serviceName: '' });
}

function login(req: Request, res: Response, next: NextFunction) {
  res.render('login.njk', { serviceName: 'Check local air quality' });
}

export default { homepage, login };
