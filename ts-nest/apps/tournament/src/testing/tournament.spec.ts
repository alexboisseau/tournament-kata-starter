import { TournamentToAdd } from '../app/api-model';
import { INestApplication } from '@nestjs/common';
import { startApp } from './test.utils';
import * as request from 'supertest';

const exampleValidTournament = {
  name: 'Unreal',
} as TournamentToAdd;

const exampleInvalidTournament = {} as TournamentToAdd;

describe('/tournament endpoint', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startApp();
  });

  describe('[POST] when creating a tournament', () => {
    it('should return a 404 error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleInvalidTournament)
        .expect(400);

      expect(body.message).toBe('Tournament must have a name');
    });

    it('should return the correct id', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleValidTournament)
        .expect(201);

      expect(body.id).not.toBeUndefined();
    });

    it('should have stored the tournament', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleValidTournament)
        .expect(201);

      const get = await request(app.getHttpServer())
        .get(`/api/tournaments/${body.id}`)
        .expect(200);

      expect(get.body.name).toEqual(exampleValidTournament.name);
    });
  });

  // describe('[GET]: when fetching a tournamenet by ID', () => {
  //   it('should return a 404 error', async (tournamentId) => {
  //     const get = await request(app.getHttpServer()).get(`/api/tournament/`).expect(200);

  //     expect(get.)
  //   });
  // });
});
