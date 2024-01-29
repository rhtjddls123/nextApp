'use client';

import { postType } from '@/util/typs';
import { Session } from 'next-auth';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
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
            {(a.author === session?.user?.email ||
              session?.user?.role === 'admin') && (
              <>
                <DetailLink href={`modify/${a._id.toString()}`}></DetailLink>
                <DeleteButton data={a}></DeleteButton>
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
