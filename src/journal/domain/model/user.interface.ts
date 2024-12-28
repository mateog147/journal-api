export interface IUser {
  _id?: any;
  userName: string;
  loginInfo: ILoginInfo;
  contactInfo: IContactInfo;
  gender: string;
  birthDay: Date;
}

export interface ILoginInfo {
  password: string;
}

export interface IContactInfo {
  email: string;
  name: string;
  lastName: string;
}

export interface IPasswordHash {
  transform(dataResponse: string): string;
}
