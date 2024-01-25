import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import Link from 'next/link';
import DetailLink from './DetailLink';

const ListPage = async () => {
  const db = (await connectDB).db('forum');
  const result = (await db.collection('post').find().toArray()) as postType[];
  return (
    <div className=' bg-[rgb(249,250,255)] p-[10px]'>
      {result.map((a, i) => (
        <div key={i}>
          <div className='bg-white border rounded-[10px] p-[20px] mb-[5px] shadow-[rgb(224, 224, 224)] shadow-md'>
            <Link href={`detail/${a._id.toString()}`}>
              <h4 className='font-extrabold m-0 text-xl'>{a.title}</h4>
            </Link>
            <p className='bg-gray-50 m-[5px 0px'>{a.content}</p>
            <DetailLink href={`modify/${a._id.toString()}`}></DetailLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPage;
