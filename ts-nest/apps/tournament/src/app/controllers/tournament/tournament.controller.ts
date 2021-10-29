import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Tournament, TournamentToAdd } from '../../api-model';
import { v4 as uuidv4 } from 'uuid';
import { TournamentRepositoryService } from '../../repositories/tournament-repository.service';
import { TournamentService } from './tournament.service';

@Controller('tournaments')
export class TournamentController {
  constructor(
    private tournamentRepository: TournamentRepositoryService,
    private tournamentService: TournamentService
  ) {}

  @Post()
  public createTournament(@Body() tournamentToAdd: TournamentToAdd): {
    id: string;
  } {
    const { name } = tournamentToAdd;

    if (!name) {
      throw new HttpException(
        'Tournament must have a name',
        HttpStatus.BAD_REQUEST
      );
    }

    const tournament = {
      id: uuidv4(),
      name,
      phases: [],
      participants: [],
    };

    this.tournamentRepository.saveTournament(tournament);

    return { id: tournament.id };
  }

  @Get(':id')
  public getTournament(@Param('id') id: string): Tournament {
    const tournament = this.tournamentRepository.getTournament(id);
    this.tournamentService.throwIfNotExists(tournament);

    return tournament;
  }
}
