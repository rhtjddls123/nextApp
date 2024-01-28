import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';
import { ProfileAvatar } from './ProfileAvatar';
import ProfileEditButton from './ProfileEditButton';

type Props = {
  session: Session | null;
};

const ProfileContent = ({ session }: Props) => {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <ProfileAvatar src={session?.user.image}></ProfileAvatar>
      <div>{session?.user.name}</div>
      <div>{session?.user.email}</div>
      {session?.user.role === 'admin' && <Link href={'/'}>회원관리</Link>}
      <div className=' flex items-center'>
        <ProfileEditButton></ProfileEditButton>
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );
};

export default ProfileContent;
