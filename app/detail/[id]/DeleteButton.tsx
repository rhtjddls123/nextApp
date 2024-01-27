'use client';

import { ObjectId } from 'mongodb';
import { DispatchWithoutAction } from 'react';

type Props = {
  id: ObjectId;
  toggle: DispatchWithoutAction;
};

const DeleteButton = ({ id, toggle }: Props) => {
  return (
    <button
      onClick={() => {
        fetch('/api/comment/delete', {
          method: 'DELETE',
          body: JSON.stringify(id),
        })
          .then((r) => r.json())
          .then(() => {
            toggle();
          });
      }}
    >
      삭제
    </button>
  );
};

export default DeleteButton;
