'use client';

import { postType } from '@/util/typs';
import Link from 'next/link';
// import { useState } from 'react';
import DetailLink from './DetailLink';

type Props = {
  data: string;
};

const ListItem = ({ data }: Props) => {
  // const [result, setResult] = useState<postType[]>(JSON.parse(data));
  const result: postType[] = JSON.parse(data);
  return (
    <div>
      {result.map((a, i) => (
        <div key={i}>
          <div className='bg-white border rounded-[10px] p-[20px] mb-[5px] shadow-[rgb(224, 224, 224)] shadow-md transition-all duration-1000 '>
            <Link href={`detail/${a._id.toString()}`}>
              <h4 className='font-extrabold m-0 text-xl'>{a.title}</h4>
            </Link>
            <p className='bg-gray-50 m-[5px 0px'>{a.content}</p>
            <DetailLink href={`modify/${a._id.toString()}`}></DetailLink>
            <button
              onClick={(e) => {
                fetch('api/delete/postDelete', {
                  method: 'DELETE',
                  body: JSON.stringify(a._id),
                })
                  .then((r) => r.json())
                  .then(() => {
                    const target = e.target as HTMLElement;
                    if (target.parentElement)
                      target.parentElement.style.opacity = '0';
                    setTimeout(() => {
                      if (target.parentElement)
                        target.parentElement.style.display = 'none';
                    }, 1000);
                  });
              }}
            >
              삭제하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListItem;
