import { connectDB } from '@/util/database';
import { commentType, postType } from '@/util/typs';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    const db = (await connectDB).db('forum');
    const data: ObjectId = JSON.parse(req.body);
    const find = (await db
      .collection('comment')
      .findOne({ _id: new ObjectId(data) })) as commentType;

    if (
      find.author === session?.user?.email ||
      session?.user.role === 'admin'
    ) {
      await db.collection('comment').deleteOne({ _id: new ObjectId(data) });
      return res.status(200).json('삭제완료');
    } else {
      return res.status(403).json('권한이 없습니다.');
    }
  } else {
    return res.status(400).json('잘못된 메서드 요청입니다.');
  }
}
