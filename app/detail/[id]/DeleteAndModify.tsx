'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  href: string;
  deleteData: string;
};

const DeleteAndModify = ({ href, deleteData }: Props) => {
  const router = useRouter();
  return (
    <div className=' flex justify-end mb-2'>
      <Button
        variant={'outline'}
        className=' mr-1'
        onClick={() => {
          router.push(href);
        }}
      >
        수정하기
      </Button>
      <Button
        variant={'outline'}
        onClick={async () => {
          await fetch('/api/post/delete', {
            method: 'DELETE',
            body: deleteData,
          })
            .then(async (r) => {
              if (r.status === 200) {
                router.push('/');
                router.refresh();
                return r.json();
              } else {
                throw new Error(await r.json());
              }
            })
            .then(() => {})
            .catch((e) => {
              alert(e);
            });
        }}
      >
        삭제하기
      </Button>
    </div>
  );
};

export default DeleteAndModify;
