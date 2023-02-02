import { getModelForClass, prop } from '@typegoose/typegoose';

export class rsvp {
  @prop({ required: true })
  public name?: string;

  @prop({ required: true })
  public participate: string;

  @prop({ required: true })
  public menu: string;

  @prop()
  public note?: string;
}

const rsvpModel = getModelForClass(rsvp);

export default rsvpModel;
