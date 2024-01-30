import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { registerType } from '@/util/typs';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Modify from './Modify';

type Props = {
  params: { email: string };
};

const ModifyProfilePage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db('forum');

  const routeParam = decodeURIComponent(params.email);
  const user = (await db
    .collection('user_cred')
    .findOne({ email: routeParam })) as registerType;
  if (
    !session ||
    !user ||
    (session.user.role !== 'admin' && routeParam !== session.user.email)
  ) {
    redirect('/');
  }
  return <Modify user={JSON.stringify(user)}></Modify>;
};

export default ModifyProfilePage;
