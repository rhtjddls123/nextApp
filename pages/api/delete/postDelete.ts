import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const db = (await connectDB).db('forum');
    const data: ObjectId = JSON.parse(req.body);
    try {
      await db.collection('post').deleteOne({ _id: new ObjectId(data) });
      return res.status(200).json('처리완료');
    } catch {
      return res.status(500).json('오류발생');
    }
  }
}
