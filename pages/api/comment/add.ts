import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const db = (await connectDB).db('forum');
    const data: { comment: string; parentId: string } = JSON.parse(req.body);
    const session = await getServerSession(req, res, authOptions);
    // console.log(data);
    if (session && data) {
      await db.collection('comment').insertOne({
        comment: data.comment,
        author: session.user.email,
        parentId: new ObjectId(data.parentId),
      });
      return res.status(200).json('성공');
    } else {
      return res.status(409).json('로그인을 해주세요!');
    }
  }
}
