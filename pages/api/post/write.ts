import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db('forum');

  if (req.method === 'POST') {
    const data: postType = req.body;
    if (data.title && data.content) {
      const result = await db.collection('post').insertOne(req.body);
      return res.status(200).json(result);
    }
  }
}
