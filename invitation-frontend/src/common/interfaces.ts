export interface Participant {
  name: string;
  adultCount?: number;
  childCount?: number;
  participate: string;
  note?: string;
  menu?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: string | undefined | number;
}

export interface DefaultRegisterDataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmedPassword: string;
  // checkbox1: boolean;
  // checkbox2: boolean;
}

export interface ILoggedInUser {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  subdomains: string[];
}

export interface AttemptUserLogin {
  email: string;
  password: string;
}

export interface SubmitInfo {
  name: string;
  rsvp: string;
  side: string;
  menu: string;
  note?: string;
}