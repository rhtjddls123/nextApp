'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { postType } from '@/util/typs';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ImageUpload from './ImageUpload';

const WritePage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<postType>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handler = (data: postType) => {
    setIsSubmitting(true);
    fetch('/api/post/write', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        img: data.img,
      }),
    })
      .then(async (r) => {
        setIsSubmitting(false);
        if (r.status === 200) {
          return r.json();
        }
        throw new Error(await r.json());
      })
      .then(() => {
        router.push('/');
        router.refresh();
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className=' p-[20px] w-3/4 h-[90%] absolute -translate-x-1/2 left-1/2'>
      <form
        onSubmit={handleSubmit((data) => {
          handler(data);
        })}
        className='h-full flex flex-col'
      >
        <Input
          placeholder={'제목을 입력해주세요'}
          className=' p-[10px] mb-[10px] border-2 grow'
          {...register('title', {
            required: true,
          })}
        ></Input>
        <hr></hr>
        <Textarea
          placeholder={'내용을 입력해주세요'}
          className='resize-none border-2 grow-[120]'
          {...register('content', {
            required: true,
          })}
        />
        <ImageUpload
          register={register}
          isSubmitting={isSubmitting}
        ></ImageUpload>
      </form>
    </div>
  );
};

export default WritePage;
