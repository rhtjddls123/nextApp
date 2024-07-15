import { ScrollArea } from '@/components/ui/scroll-area';
import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import React from 'react';
import Comment from './Comment';
import DeleteAndModify from './DeleteAndModify';

type Props = {
  params: { id: string };
};

const DetailPage = async ({ params }: Props) => {
  const db = (await connectDB).db('forum');
  const result = (await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.id) })) as postType;
  return (
    <div className=' pt-[20px] px-[20px] w-3/4 h-[100%] absolute -translate-x-1/2 left-1/2'>
      <div className='h-full flex flex-col'>
        <ScrollArea>
          <DeleteAndModify
            author={result.author}
            href={`/modify/${params.id}`}
            deleteData={JSON.stringify(result)}
          ></DeleteAndModify>
          <div className=' p-[10px] mb-[10px] border-2 grow flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background'>
            {result.title}
          </div>
          <ScrollArea className='grow-[120] '>
            <div className=' h-[500px] whitespace-pre-wrap p-[10px] mb-[10px] border-2 flex flex-col w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background'>
              {result.img && (
                <Image
                  src={result.img}
                  alt='contentImg'
                  width={1500}
                  height={1500}
                  className=' h-[200px] w-fit'
                ></Image>
              )}
              {'\n'}
              {result.content}
            </div>
          </ScrollArea>
          <Comment parentId={result._id.toString()}></Comment>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DetailPage;
