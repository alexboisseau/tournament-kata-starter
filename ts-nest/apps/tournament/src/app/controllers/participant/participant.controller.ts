import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Participant } from '../../api-model';
import { v4 as uuidv4 } from 'uuid';
import { TournamentRepositoryService } from '../../repositories/tournament-repository.service';
import { TournamentService } from '../tournament/tournament.service';

@Controller('tournaments/:id/participants')
export class ParticipantController {
  constructor(
    private tournamentRepository: TournamentRepositoryService,
    private tournamentService: TournamentService
  ) {}

  @Post()
  public createParticipant(
    @Param('id') id: string,
    @Body() participantToAdd: Participant
  ): {
    id: string;
  } {
    const tournament = this.tournamentRepository.getTournament(id);
    this.tournamentService.throwIfNotExists(tournament);

    const { name, elo } = participantToAdd;

    if (!name || !elo) {
      throw new HttpException(
        'Participant must have a name and elo',
        HttpStatus.BAD_REQUEST
      );
    }

    const participant = {
      id: uuidv4(),
      name,
      elo,
    };

    this.tournamentRepository.saveParticipant(id, participant);

    return { id: participant.id };
  }
}
