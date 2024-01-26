import { connectDB } from '@/util/database';
import { registerType } from '@/util/typs';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data: registerType = JSON.parse(req.body);
    const db = (await connectDB).db('forum');
    //중복확인
    const socialUser = await db
      .collection('users')
      .findOne({ email: data.email });
    const user = await db
      .collection('user_cred')
      .findOne({ email: data.email });
    if (socialUser || user) {
      return res.status(409).json('이미 사용중인 이메일입니다!');
    }
    return res.status(200).json('사용 가능합니다.');
  }
}
