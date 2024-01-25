import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { getServerSession } from 'next-auth';
import ListItem from './ListItem';

export const dynamic = 'force-dynamic';

const ListPage = async () => {
  const db = (await connectDB).db('forum');
  const result = (await db.collection('post').find().toArray()) as postType[];
  const session = await getServerSession(authOptions);
  return (
    <div className=' bg-[rgb(249,250,255)] p-[10px]'>
      <ListItem data={JSON.stringify(result)} session={session}></ListItem>
    </div>
  );
};

export default ListPage;
