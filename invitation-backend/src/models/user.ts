import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, minlength: 10, maxlength: 32, select: false })
  password: string;
}

const userModel = getModelForClass(User);

export default userModel;