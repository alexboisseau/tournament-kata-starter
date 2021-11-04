import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { TournamentService } from '../tournament/tournament.service';

@Controller('tournaments/:id/participants')
export class ParticipantController {
  constructor(
    private tournamentService: TournamentService,
    private participantService: ParticipantService
  ) {}
  @Post()
  async createParticipant(
    @Param('id') id: string,
    @Body() createParticipantDto: CreateParticipantDto
  ) {
    const tournament = await this.tournamentService.find(id);

    if (!tournament) {
      throw new HttpException(
        "Tournament doesn't exists",
        HttpStatus.NOT_FOUND
      );
    }

    const { name, elo } = createParticipantDto;
    if (!name || !elo) {
      throw new HttpException(
        'Participant must have a name and elo',
        HttpStatus.BAD_REQUEST
      );
    }

    const createdParticipant = await this.participantService.create(
      tournament.id,
      createParticipantDto
    );

    await this.tournamentService.addParticipant(
      tournament.id,
      createdParticipant.id
    );

    return { id: createdParticipant.id };
  }
}
