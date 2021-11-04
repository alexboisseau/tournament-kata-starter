import { Module } from '@nestjs/common';
import { PingController } from './controllers/ping/ping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TournamentModule } from './controllers/tournament/tournament.module';
import { ParticipantModule } from './controllers/participant/participant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_DATABASE_USERNAME}:${process.env.MONGODB_DATABASE_PASSWORD}@archlocluster.4g3u5.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`
    ),
    TournamentModule,
    ParticipantModule,
  ],
  controllers: [PingController],
})
export class AppModule {}
