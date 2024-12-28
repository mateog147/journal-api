import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IContactInfo, ILoginInfo, IUser } from 'src/journal/domain/model';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class LoginInfo implements ILoginInfo {
  @Prop()
  password: string;
}

export const LoginInfoSchema = SchemaFactory.createForClass(LoginInfo);

@Schema()
export class ContactInfo implements IContactInfo {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  lastName: string;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);

@Schema()
export class User implements IUser {
  @Prop()
  userName: string;

  @Prop(LoginInfoSchema)
  loginInfo: LoginInfo;

  @Prop(ContactInfoSchema)
  contactInfo: ContactInfo;

  @Prop()
  gender: string;

  @Prop()
  birthDay: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
