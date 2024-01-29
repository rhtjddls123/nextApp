'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { postType } from '@/util/typs';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  result: postType;
};

const Modify = ({ result }: Props) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<postType>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handler = (data: postType) => {
    setIsSubmitting(true);
    fetch('/api/post/modify', {
      method: 'POST',
      body: JSON.stringify({
        _id: data._id,
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
        router.push('/list');
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
        <input
          value={result._id.toString()}
          className=' hidden'
          {...register('_id')}
        ></input>
        <Input
          placeholder={'제목을 입력해주세요'}
          defaultValue={result.title}
          className=' p-[10px] mb-[10px] border-2 grow'
          {...register('title', {
            required: true,
          })}
        ></Input>
        <hr></hr>
        <Textarea
          placeholder={'내용을 입력해주세요'}
          defaultValue={result.content}
          className='resize-none border-2 grow-[120]'
          {...register('content', {
            required: true,
          })}
        />
        <div className=' mt-2'>
          <Button
            variant={'secondary'}
            type='submit'
            className=' px-[10px] py-[15px]'
            disabled={isSubmitting}
          >
            전송
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Modify;
