import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Participant } from '../participant/participant.schema';

export type TournamentDocument = Tournament & Document;

@Schema({ timestamps: true, id: true, toObject: { getters: true } })
export class Tournament {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
  })
  participants: Participant[];
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
