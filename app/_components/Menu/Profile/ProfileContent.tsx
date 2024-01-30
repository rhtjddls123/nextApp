import { connectDB } from '@/util/database';
import { registerType } from '@/util/typs';
import { Session } from 'next-auth';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';
import { ProfileAvatar } from './ProfileAvatar';
import ProfileEditButton from './ProfileEditButton';

type Props = {
  session: Session | null;
};

const ProfileContent = async ({ session }: Props) => {
  const db = (await connectDB).db('forum');

  const user = (await db
    .collection('user_cred')
    .findOne({ email: session?.user.email })) as registerType;
  return (
    <div className=' flex flex-col items-center justify-center'>
      <ProfileAvatar
        src={user ? user.image : session?.user.image}
      ></ProfileAvatar>
      <div>{session?.user.name}</div>
      <div>{session?.user.email}</div>
      {session?.user.role === 'admin' && <Link href={'/'}>회원관리</Link>}
      <div className=' flex items-center'>
        {session?.user.email && user && (
          <ProfileEditButton href={session.user.email}></ProfileEditButton>
        )}
        {session?.user.email && <LogoutButton></LogoutButton>}
      </div>
    </div>
  );
};

export default ProfileContent;
