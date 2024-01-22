import { Request, Response, NextFunction } from 'express';

function feedback(req: Request, res: Response, next: NextFunction) {
  res.render('feedback.njk', {
    serviceName: 'Feedback service',
  });
}

export default { feedback };
