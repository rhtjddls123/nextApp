import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import ListItem from './ListItem';

const ListPage = async () => {
  const db = (await connectDB).db('forum');
  const result = (await db.collection('post').find().toArray()) as postType[];
  return (
    <div className=' bg-[rgb(249,250,255)] p-[10px]'>
      <ListItem data={JSON.stringify(result)}></ListItem>
    </div>
  );
};

export default ListPage;
