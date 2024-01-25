import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { ObjectId } from 'mongodb';

type Props = {
  params: { id: string };
};

const ModifyPage = async ({ params }: Props) => {
  const db = (await connectDB).db('forum');
  const result = (await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.id) })) as postType;

  return (
    <div className=' p-[20px]'>
      <h4>수정페이지</h4>
      <form action={'/api/put/modify'} method='POST'>
        <input
          name='_id'
          defaultValue={result._id.toString()}
          className=' hidden'
        ></input>
        title:{' '}
        <input
          name='title'
          placeholder='글제목'
          className=' box-border p-[10px] block mb-[10px] border border-black'
          defaultValue={result.title}
        ></input>
        content:{' '}
        <input
          name='content'
          placeholder='글내용'
          className=' box-border p-[10px] block mb-[10px] border border-black'
          defaultValue={result.content}
        ></input>
        <button
          type='submit'
          className=' px-[10px] py-[15px] bg-gray-200 border-none roun-[5px]'
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default ModifyPage;
