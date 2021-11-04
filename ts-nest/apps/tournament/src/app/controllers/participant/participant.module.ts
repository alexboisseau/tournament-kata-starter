import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentModule } from '../tournament/tournament.module';
import { TournamentService } from '../tournament/tournament.service';
import { ParticipantController } from './participant.controller';
import { Participant, ParticipantSchema } from './participant.schema';
import { ParticipantService } from './participant.service';

const mongoosePartipantModule = MongooseModule.forFeature([
  { name: Participant.name, schema: ParticipantSchema },
]);

@Module({
  imports: [mongoosePartipantModule, TournamentModule],
  controllers: [ParticipantController],
  providers: [ParticipantService, TournamentService],
})
export class ParticipantModule {}
