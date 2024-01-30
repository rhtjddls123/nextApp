'use client';

import { Button } from '@/components/ui/button';
import { ObjectId } from 'mongodb';
import { DispatchWithoutAction, useState } from 'react';

type Props = {
  id: ObjectId;
  toggle: DispatchWithoutAction;
};

const DeleteButton = ({ id, toggle }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Button
      variant={'outline'}
      className=' w-fit'
      disabled={isSubmitting}
      onClick={() => {
        setIsSubmitting(true);
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
    </Button>
  );
};

export default DeleteButton;
