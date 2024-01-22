import request from 'supertest';
import app from '../../app';

describe('homepage', () => {
  describe('get homepage route', () => {
    describe('given the homepage does not exist', () => {
      it('should return a 200', async () => {
        const res = await request(app).get('/location-search');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
      });
    });
  });
});
