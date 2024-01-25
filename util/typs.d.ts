import { ObjectId } from 'mongodb';

export type postType = {
  _id: ObjectId;
  title: string;
  content: string;
};
