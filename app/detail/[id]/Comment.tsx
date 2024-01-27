'use client';

import { commentType } from '@/util/typs';
import { useSession } from 'next-auth/react';
import { useEffect, useReducer, useRef, useState } from 'react';
import DeleteButton from './DeleteButton';

type Props = {
  parentId: string;
};

const Comment = ({ parentId }: Props) => {
  const commentRef = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState<commentType[]>();
  const [render, renderToggle] = useReducer((pre) => !pre, true);
  const { data: session } = useSession();

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
          <div key={a._id.toString()} className=' border border-black m-2'>
            <div className=' p-2 m-2'>댓글 내용: {a.comment}</div>
            <div className=' p-2 m-2'>작성자: {a.author}</div>
            {(a.author === session?.user.email ||
              session?.user.email === 'admin') && (
              <DeleteButton id={a._id} toggle={renderToggle}></DeleteButton>
            )}
          </div>
        ))}
      <input
        placeholder='댓글입력...'
        className='box-border p-[10px] block mb-[10px] border border-black'
        ref={commentRef}
      ></input>
      <button
        onClick={() => {
          if (commentRef.current?.value)
            fetch('/api/comment/add', {
              method: 'POST',
              body: JSON.stringify({
                comment: commentRef.current?.value,
                parentId: parentId,
              }),
            })
              .then((r) => r.json())
              .then(() => {
                renderToggle();
                if (commentRef.current) commentRef.current.value = '';
              });
          else alert('댓글을 입력해주세요');
        }}
      >
        댓글전송
      </button>
    </div>
  );
};

export default Comment;
