'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  author: string;
  href: string;
  deleteData: string;
};

const DeleteAndModify = ({ author, href, deleteData }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {session?.email === author ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default DeleteAndModify;
