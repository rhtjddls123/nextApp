'use client';

import { useRouter } from 'next/navigation';

type Props = {
  href: string;
};

const DetailLink = ({ href }: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(href);
      }}
    >
      수정하기
    </button>
  );
};

export default DetailLink;
