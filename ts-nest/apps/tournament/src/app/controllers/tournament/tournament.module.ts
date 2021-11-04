import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentController } from './tournament.controller';
import { Tournament, TournamentSchema } from './tournament.schema';
import { TournamentService } from './tournament.service';

const mongooseTournamentModule = MongooseModule.forFeature([
  { name: Tournament.name, schema: TournamentSchema },
]);

@Module({
  imports: [mongooseTournamentModule],
  exports: [mongooseTournamentModule],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
