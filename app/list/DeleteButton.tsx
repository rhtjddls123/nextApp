'use client';

import { postType } from '@/util/typs';
import { useState } from 'react';

type Props = {
  data: postType;
};

const DeleteButton = ({ data }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <button
      disabled={isSubmitting}
      onClick={(e) => {
        setIsSubmitting(true);
        fetch('api/post/delete', {
          method: 'DELETE',
          body: JSON.stringify(data),
        })
          .then((r) => {
            if (r.status === 200) {
              return r.json();
            } else {
              throw new Error();
            }
          })
          .then(() => {
            const target = e.target as HTMLElement;
            if (target.parentElement) target.parentElement.style.opacity = '0';
            setTimeout(() => {
              if (target.parentElement)
                target.parentElement.style.display = 'none';
            }, 1000);
          })
          .catch((e) => e);
      }}
    >
      삭제하기
    </button>
  );
};

export default DeleteButton;
