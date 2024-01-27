// 'use client';
import aws from 'aws-sdk';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';

const WritePage = () => {
  // const [src, setSrc] = useState('');
  // const [res, setRes] = useState<aws.S3.PresignedPost>();

  const session = getServerSession();

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
