// 'use client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ImageUpload from './ImageUpload';

const WritePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('api/auth/signin');
  }

  return (
    <div className=' p-[20px]'>
      <form action={'/api/post/write'} method='POST'>
        title:{' '}
        <input
          name='title'
          placeholder='글제목'
          className=' box-border p-[10px] block mb-[10px] border border-black'
        ></input>
        content:{' '}
        <input
          name='content'
          placeholder='글내용'
          className=' box-border p-[10px] block mb-[10px] border border-black'
        ></input>
        <ImageUpload></ImageUpload>
      </form>
    </div>
  );
};

export default WritePage;
