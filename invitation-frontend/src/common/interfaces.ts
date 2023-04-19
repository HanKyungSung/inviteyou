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