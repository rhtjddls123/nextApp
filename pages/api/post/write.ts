import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'POST' && session && session.user?.email) {
    const db = (await connectDB).db('forum');
    const data: postType = req.body;
    data.author = session.user.email;
    // console.log(data);
    if (!data.title || !data.content) {
      return res.status(500).json('제목과 내용을 입력해주세요');
    }
    try {
      await db.collection('post').insertOne(data);
      return res.redirect(302, '/list');
    } catch {
      return res.status(500).json('오류가 발생했습니다.');
    }
  }
}
