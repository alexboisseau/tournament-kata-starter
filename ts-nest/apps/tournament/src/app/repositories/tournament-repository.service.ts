import { Injectable } from '@nestjs/common';
import { Participant, Tournament } from '../api-model';

@Injectable()
export class TournamentRepositoryService {
  private tournaments = new Map<string, Tournament>();

  public saveTournament(tournament: Tournament): void {
    this.tournaments.set(tournament.id, tournament);
  }

  public getTournament(tournamentId: string): Tournament {
    return this.tournaments.get(tournamentId);
  }

  public saveParticipant(tournamentId: string, participant: Participant): void {
    const tournament = this.tournaments.get(tournamentId);
    tournament.participants.push(participant);
    this.tournaments.set(tournament.id, tournament);
  }
}
