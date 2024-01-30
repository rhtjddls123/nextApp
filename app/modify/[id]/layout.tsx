import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

export default async function RootLayout({ children, params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/list');
  }
  const db = (await connectDB).db('forum');
  const result = (await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.id) })) as postType;

  if (session.user.role !== 'admin' && result.author !== session.user.email)
    redirect('/list');
  return <>{children}</>;
}
