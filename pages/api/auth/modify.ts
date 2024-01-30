import { connectDB } from '@/util/database';
import { registerType } from '@/util/typs';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db('forum');

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const data: registerType = JSON.parse(req.body);
    if (!data.name) {
      return res.status(500).json('이름을 입력해주세요');
    }
    const find = (await db
      .collection('user_cred')
      .findOne({ _id: new ObjectId(data._id) })) as registerType;
    try {
      if (
        find.email === session?.user?.email ||
        session?.user.role === 'admin'
      ) {
        data._id = new ObjectId(data._id);
        await db
          .collection('user_cred')
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
