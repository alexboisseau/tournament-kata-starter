import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateTournamentDto } from './dto/create-tournament.dto';
import { Tournament, TournamentDocument } from './tournament.schema';

@Injectable()
export class TournamentService {
  constructor(
    @InjectModel(Tournament.name)
    private tournamentModel: Model<TournamentDocument>
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    const createdTournament = new this.tournamentModel(createTournamentDto);

    return createdTournament.save();
  }

  async addParticipant(tournamentId: string, participantId: string) {
    if (
      !Types.ObjectId.isValid(tournamentId) ||
      !Types.ObjectId.isValid(participantId)
    )
      return undefined;

    return this.tournamentModel.findByIdAndUpdate(
      tournamentId,
      {
        $push: { participants: participantId },
      },
      { new: true }
    );
  }

  async find(id: string) {
    if (!Types.ObjectId.isValid(id)) return undefined;

    return this.tournamentModel.findById(id).populate('participants').exec();
  }

  async findAll() {
    return this.tournamentModel.find().populate('participants').exec();
  }
}
