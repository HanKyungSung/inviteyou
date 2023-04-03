import { getModelForClass, prop } from '@typegoose/typegoose';
import * as crypto from 'crypto';

export class User {
  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, maxlength: 32 })
  firstName: string;

  @prop({ required: true, maxlength: 32 })
  lastName: string;
  
  @prop()
  password: string;

  @prop()
  salt: string;

  setPassword(password: string) {
    // Creating a unique salt for a user.
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  }

  validatePassword(password: string) {
    const hashedPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

    return this.password == hashedPassword;
  }
}

const UserModel = getModelForClass(User);

export default UserModel;