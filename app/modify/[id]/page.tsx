import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { ObjectId } from 'mongodb';
import Modify from './Modify';

type Props = {
  params: { id: string };
};

const ModifyPage = async ({ params }: Props) => {
  const db = (await connectDB).db('forum');
  const result = (await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.id) })) as postType;

  return <Modify result={JSON.stringify(result)}></Modify>;
};

export default ModifyPage;
