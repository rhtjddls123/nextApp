import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { ObjectId } from 'mongodb';
import React from 'react';
import Comment from './Comment';

type Props = {
  params: { id: string };
};

const DetailPage = async ({ params }: Props) => {
  const db = (await connectDB).db('forum');
  const result = (await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.id) })) as postType;
  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <Comment parentId={result._id.toString()}></Comment>
    </div>
  );
};

export default DetailPage;
