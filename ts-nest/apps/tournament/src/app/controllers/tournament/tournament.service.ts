import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tournament } from '../../api-model';

@Injectable()
export class TournamentService {
  throwIfNotExists(tournament: Tournament | undefined): void {
    if (!tournament) {
      throw new HttpException(
        "Tournament doesn't exists",
        HttpStatus.NOT_FOUND
      );
    }
  }
}
