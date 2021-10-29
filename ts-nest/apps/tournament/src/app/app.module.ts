import { Module } from '@nestjs/common';
import { ParticipantController } from './controllers/participant/participant.controller';
import { PingController } from './controllers/ping/ping.controller';
import { TournamentController } from './controllers/tournament/tournament.controller';
import { TournamentRepositoryService } from './repositories/tournament-repository.service';
import { TournamentService } from './controllers/tournament/tournament.service';

@Module({
  imports: [],
  controllers: [PingController, ParticipantController, TournamentController],
  providers: [TournamentRepositoryService, TournamentService],
})
export class AppModule {}
