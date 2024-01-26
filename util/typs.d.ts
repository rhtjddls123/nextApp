import { ObjectId } from 'mongodb';

export type postType = {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
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
};
