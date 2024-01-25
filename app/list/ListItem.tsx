'use client';

import { postType } from '@/util/typs';
import { Session } from 'next-auth';
import Link from 'next/link';
// import { useState } from 'react';
import DetailLink from './DetailLink';

type Props = {
  data: string;
  session: Session | null;
};

const ListItem = ({ data, session }: Props) => {
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
            {a.author === session?.user?.email && (
              <>
                <DetailLink href={`modify/${a._id.toString()}`}></DetailLink>
                <button
                  onClick={(e) => {
                    fetch('api/delete/postDelete', {
                      method: 'DELETE',
                      body: JSON.stringify(a),
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
                        if (target.parentElement)
                          target.parentElement.style.opacity = '0';
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
              </>
            )}
            <p>{a.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListItem;
