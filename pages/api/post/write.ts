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
    if (!data.title || !data.content) {
      return res.status(500).json('제목과 내용을 입력해주세요');
    }
    try {
      await db.collection('post').insertOne(req.body);
      return res.redirect(302, '/list');
    } catch {
      return res.status(500).json('오류가 발생했습니다.');
    }
  }
}
