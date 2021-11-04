import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tournament } from '../tournament/tournament.schema';

export type ParticipantDocument = Participant & Document;

@Schema({ timestamps: true, id: true, toObject: { getters: true } })
export class Participant {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  elo: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true,
  })
  tournament: Tournament;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
