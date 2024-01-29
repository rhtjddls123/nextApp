import { ObjectId } from 'mongodb';

export type postType = {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
  img?: string;
  d: boolean;
};

export type joinType = {
  _id: ObjectId;
  id: string;
  password: string;
};

export type registerType = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  birthDate?: number;
  phoneNumber?: string;
};

export type commentType = {
  _id: ObjectId;
  comment: string;
  author: string;
  parentId: ObjectId;
};
