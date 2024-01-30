import { connectDB } from '@/util/database';
import { registerType } from '@/util/typs';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db('forum');

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const data: {
      _id: ObjectId;
      password: string;
      passwordCheck: string;
      curPW: string;
    } = JSON.parse(req.body);
    const find = (await db
      .collection('user_cred')
      .findOne({ _id: new ObjectId(data._id) })) as registerType;
    const pwcheck = await bcrypt.compare(data.curPW, find.password);
    try {
      if (
        (find.email === session?.user?.email ||
          session?.user.role === 'admin') &&
        pwcheck
      ) {
        data._id = new ObjectId(data._id);
        const hash = await bcrypt.hash(data.password, 10);
        data.password = hash;
        data.passwordCheck = hash;
        await db
          .collection('user_cred')
          .updateOne({ _id: data._id }, { $set: data });
        return res.status(200).json('성공');
      } else {
        return res.status(500).json('비밀번호를 정확하게 입력해주세요');
      }
    } catch {
      return res.status(500).json('오류가 발생했습니다.');
    }
  }
}
