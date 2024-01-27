import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const db = (await connectDB).db('forum');
    if (req.query.id) {
      const result = await db
        .collection('comment')
        .find({ parentId: new ObjectId(req.query.id as string) })
        .toArray();
      return res.status(200).json(result);
    }
  }
}
