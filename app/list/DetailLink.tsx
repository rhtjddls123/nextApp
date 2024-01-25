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
      버튼
    </button>
  );
};

export default DetailLink;
