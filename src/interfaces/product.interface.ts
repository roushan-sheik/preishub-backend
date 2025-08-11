import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  _id: Types.ObjectId;
  title: string;
  image: string;
  description?: string;
  price: string;
  affiliate_link: string;
  category: Types.ObjectId | ICategory;
  brand?: string;
  season?: string[];
  ageGroup?: string[];
  type?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProduct {
  title: string;
  image: string;
  description?: string;
  price: string;
  affiliate_link: string;
  category: string;
  brand?: string;
  season?: string[];
  ageGroup?: string[];
  type?: string;
}

export interface IUpdateProduct {
  title?: string;
  image?: string;
  description?: string;
  price?: string;
  affiliate_link?: string;
  category?: string;
  brand?: string;
  season?: string[];
  ageGroup?: string[];
  type?: string;
}
