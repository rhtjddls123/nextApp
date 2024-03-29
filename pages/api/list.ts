import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db('forum');
  const result = (await db.collection('post').find().toArray()) as postType[];
  if (req.method === 'GET') {
    return res.status(200).json(result);
  }
}
