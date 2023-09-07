import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Rsvp extends TimeStamps {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public participate: string;

  @prop()
  public menu?: string;

  @prop()
  public adultCount?: number;

  @prop()
  public childCount?: number;

  @prop()
  public note?: string;
  
  @prop()
  public side?: string;

  @prop({ required: true })
  public subdomain: string;
}

const rsvpModel = getModelForClass(Rsvp);

export default rsvpModel;
