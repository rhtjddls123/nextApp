import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db('forum');

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const data: postType = JSON.parse(req.body);
    if (!data.title || !data.content) {
      return res.status(500).json('제목과 내용을 입력해주세요');
    }
    const find = (await db
      .collection('post')
      .findOne({ _id: new ObjectId(data._id) })) as postType;
    try {
      if (
        find.author === session?.user?.email ||
        session?.user.role === 'admin'
      ) {
        data._id = new ObjectId(data._id);
        await db
          .collection('post')
          .updateOne({ _id: data._id }, { $set: data });
        return res.status(200).json('성공');
      } else {
        return res.status(409).json('실패');
      }
    } catch {
      return res.status(500).json('오류가 발생했습니다.');
    }
  }
}
