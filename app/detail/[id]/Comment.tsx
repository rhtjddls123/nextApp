'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { commentType } from '@/util/typs';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useEffect, useReducer, useState } from 'react';
import DeleteButton from './DeleteButton';

type Props = {
  parentId: string;
};

const Comment = ({ parentId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<commentType & { parentId: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState<commentType[]>();
  const [render, renderToggle] = useReducer((pre) => !pre, true);
  const { data: session } = useSession();

  const handler = (data: commentType & { parentId: string }) => {
    setIsSubmitting(true);
    fetch('/api/comment/add', {
      method: 'POST',
      body: JSON.stringify({
        comment: data.comment,
        parentId: parentId,
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
        renderToggle();
        reset();
      })
      .catch((e) => {
        alert(e);
      });
  };
  useEffect(() => {
    fetch(`/api/comment/get?id=${parentId}`, {
      method: 'GET',
    })
      .then((r) => {
        return r.json();
      })
      .then((r: commentType[]) => {
        setComment(r);
      });
  }, [parentId, render]);

  return (
    <div>
      {comment &&
        comment.map((a) => (
          <div
            key={a._id.toString()}
            className=' p-[10px] mb-[10px] border-2 grow flex flex-col w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background'
          >
            <div className=' flex justify-between'>
              <div className=' p-2 m-2'>{a.comment}</div>
              <div className=' flex flex-col items-end'>
                <div className=' p-2 m-2'>작성자: {a.author}</div>
                {(a.author === session?.user.email ||
                  session?.user.email === 'admin') && (
                  <DeleteButton id={a._id} toggle={renderToggle}></DeleteButton>
                )}
              </div>
            </div>
          </div>
        ))}
      <form
        onSubmit={handleSubmit((data) => {
          handler(data);
        })}
      >
        <Textarea
          placeholder='댓글입력...'
          className=' border-2'
          {...register('comment', {
            required: '댓글을 입력해주세요',
          })}
        ></Textarea>
        {errors.comment && (
          <small className=' text-red-400'>
            {errors.comment.message?.toString()}
          </small>
        )}
        <Button variant={'outline'} className=' my-4' disabled={isSubmitting}>
          댓글전송
        </Button>
      </form>
    </div>
  );
};

export default Comment;
