import { Request, Response, NextFunction } from 'express';

function privacy(req: Request, res: Response, next: NextFunction) {
  res.render('privacy.njk', {
    serviceName: 'Privacy notice',
  });
}

function termsAndConditions(req: Request, res: Response, next: NextFunction) {
  res.render('terms-and-conditions.njk', {
    serviceName: 'Terms and Conditions',
  });
}
function accessibility(req: Request, res: Response, next: NextFunction) {
  res.render('accessibility.njk', {
    serviceName: 'Accessibility statement',
  });
}
function cookies(req: Request, res: Response, next: NextFunction) {
  res.render('cookies.njk', {
    serviceName: 'Cookies on GOV.UK',
  });
}

export default { privacy, termsAndConditions, accessibility, cookies };
