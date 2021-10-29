import { TournamentToAdd } from '../app/api-model';
import { Participant } from '../app/api-model';
import { INestApplication } from '@nestjs/common';
import { startApp } from './test.utils';
import * as request from 'supertest';

const exampleValidTournament = {
  name: 'Unreal',
} as TournamentToAdd;
const exampleInvalidTournament = {} as TournamentToAdd;

const exampleValidParticipant = {
  name: 'Rocky',
  elo: 300,
} as Participant;
const exampleInvalidParticipant = {} as Participant;

describe('/tournament endpoint', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startApp();
  });

  const getTournament = (tournamentId: string) => {
    return request(app.getHttpServer()).get(`/api/tournaments/${tournamentId}`);
  };

  const postTournament = (tournamentData: TournamentToAdd) => {
    return request(app.getHttpServer())
      .post('/api/tournaments')
      .send(tournamentData);
  };

  const postParticipant = (
    tournamentId: string,
    participantData: Participant
  ) => {
    return request(app.getHttpServer())
      .post(`/api/tournaments/${tournamentId}/participants`)
      .send(participantData);
  };

  describe('[POST] when creating a tournament', () => {
    it('should return a 400 error', async () => {
      const { body } = await postTournament(exampleInvalidTournament).expect(
        400
      );

      expect(body.message).toBe('Tournament must have a name');
    });

    it('should return the correct id', async () => {
      const { body } = await postTournament(exampleValidTournament).expect(201);

      expect(body.id).toBeTruthy();
    });

    it('should have stored the tournament', async () => {
      const { body } = await postTournament(exampleValidTournament).expect(201);
      const { body: getBody } = await getTournament(body.id).expect(200);

      expect(getBody.name).toEqual(exampleValidTournament.name);
    });
  });

  describe('[GET]: when fetching a tournament by ID', () => {
    it('should return a 404 error', async () => {
      const { body } = await getTournament('doesNotExists').expect(404);

      expect(body.message).toBe("Tournament doesn't exists");
    });

    it('should return a tournament with its ID', async () => {
      const { body: getBody } = await postTournament(
        exampleValidTournament
      ).expect(201);
      const { body } = await getTournament(getBody.id).expect(200);

      expect(body.id).toBeTruthy();
    });
  });

  describe('[POST]: when add participants in a tournament', () => {
    it("should return a 404 if tournament doesn't exists", async () => {
      const { body } = await postParticipant(
        'doesNotExists',
        exampleInvalidParticipant
      ).expect(404);

      expect(body.message).toBe("Tournament doesn't exists");
    });

    it('should return 400 if participant name or elo are incorrects', async () => {
      const { body: getBody } = await postTournament(
        exampleValidTournament
      ).expect(201);
      const { body } = await postParticipant(
        getBody.id,
        exampleInvalidParticipant
      ).expect(400);

      expect(body.message).toBe('Participant must have a name and elo');
    });

    it('should return 201 when participant is added in tournament', async () => {
      const { body: getBody } = await postTournament(
        exampleValidTournament
      ).expect(201);
      const { body } = await postParticipant(
        getBody.id,
        exampleValidParticipant
      ).expect(201);

      expect(body.id).toBeTruthy();
    });
  });
});
