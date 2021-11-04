import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant, ParticipantDocument } from './participant.schema';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>
  ) {}

  async create(
    tournamentId: string,
    createParticipantDto: CreateParticipantDto
  ) {
    const createdParticipant = new this.participantModel({
      ...createParticipantDto,
      tournament: tournamentId,
    });

    return createdParticipant.save();
  }
}
