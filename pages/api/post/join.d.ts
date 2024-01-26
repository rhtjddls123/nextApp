import { connectDB } from '@/util/database';
import { joinType } from '@/util/typs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db('forum');

  if (req.method === 'POST') {
    const data: joinType = req.body;
    if (!data.id || !data.password) {
      return res.status(500).json('id와 password를 입력해주세요');
    }
    try {
      const database = await db.collection('user');
      if (await database.findOne({ id: data.id }))
        return res.status(500).json('id가 중복되었습니다.');
      return res.redirect(302, '/');
    } catch {
      return res.status(500).json('오류가 발생했습니다.');
    }
  }
}
