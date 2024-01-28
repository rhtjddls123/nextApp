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

    // 중복확인;
    const socialUser = await db
      .collection('users')
      .findOne({ email: data.email });
    const user = await db
      .collection('user_cred')
      .findOne({ email: data.email });

    if (socialUser || user) {
      return res.status(409).json('이메일 중복을 확인해주세요!');
    }
    //비밀번호 일치 확인
    if (data.password !== data.passwordCheck) {
      return res.status(409).json('비밀번호가 다릅니다!');
    }
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    data.passwordCheck = hash;
    await db.collection('user_cred').insertOne(data);
    res.status(200).json('가입성공');
  }
}
