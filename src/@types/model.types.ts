import { Document } from 'mongoose';

// Define the interface for the nested company location
interface ILocation {
  country: string;
  address: string;
}

// Define the interface for the nested company details
interface ICompany {
  title: string;
  email: string;
  phone: string;
  location: ILocation;
}

export interface IBook extends Document {
  _id: number;
  title: string;
  author_id: number;
  genre: string;
}

export interface IAuthor extends Document {
  _id: number;
  name: string;
  birth_year: number;
}

export interface IUser extends Document {
  index: number;
  name: string;
  isActive: boolean;
  registered: Date;
  age: number;
  gender: string;
  eyeColor: string;
  favoriteFruit: string;
  company: ICompany;
  tags: string[];
}
