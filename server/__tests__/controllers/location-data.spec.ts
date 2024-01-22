import request from 'supertest';
import app from '../../app';

describe('location data search', () => {
  describe('get location data search route', () => {
    describe('given the location data search does not exist', () => {
      beforeEach(async () => {
        // todo database connection
      });

      it('should return search data', async () => {
        const result = { log: '45', lat: '90' };
        const res = await request(app).get('/location-search');
        expect(res.status).toBe(200);
        expect(result).toBe(result);
      });
    });
  });
});
