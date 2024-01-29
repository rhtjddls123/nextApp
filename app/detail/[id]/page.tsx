import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
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
      <div className=' whitespace-pre-wrap'>{result.content}</div>
      {result.img && (
        <Image
          src={result.img}
          alt='contentImg'
          width={1500}
          height={1500}
          className=' h-[300px] w-auto'
        ></Image>
      )}
      <Comment parentId={result._id.toString()}></Comment>
    </div>
  );
};

export default DetailPage;
