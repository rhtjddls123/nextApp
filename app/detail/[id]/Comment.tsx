'use client';

import { useRef } from 'react';

type Props = {
  parentId: string;
};

const Comment = ({ parentId }: Props) => {
  const commentRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <div>댓글 보여줄곳</div>
      <input
        placeholder='댓글입력...'
        className='box-border p-[10px] block mb-[10px] border border-black'
        ref={commentRef}
      ></input>
      <button
        onClick={() => {
          fetch('/api/comment/addComment', {
            method: 'POST',
            body: JSON.stringify({
              comment: commentRef.current?.value,
              parentId: parentId,
            }),
          })
            .then((r) => r.json())
            .then((r) => {
              alert(r);
            });
        }}
      >
        댓글전송
      </button>
    </div>
  );
};

export default Comment;
