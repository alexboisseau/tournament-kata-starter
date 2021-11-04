import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@Controller('tournaments')
export class TournamentController {
  constructor(private tournamentService: TournamentService) {}

  @Post()
  async createTournament(@Body() createTournamentDto: CreateTournamentDto) {
    const { name } = createTournamentDto;

    if (!name) {
      throw new HttpException(
        'Tournament must have a name',
        HttpStatus.BAD_REQUEST
      );
    }

    const createdTournament = await this.tournamentService.create({ name });

    return { id: createdTournament.id };
  }

  @Get(':id')
  async getTournament(@Param('id') id: string) {
    const tournament = await this.tournamentService.find(id);

    if (!tournament) {
      throw new HttpException(
        "Tournament doesn't exists",
        HttpStatus.NOT_FOUND
      );
    }

    return tournament.toObject({ getters: true });
  }
}
