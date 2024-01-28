import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Navigation } from './Navigation';
import { ProfilePopover } from './Profile/ProfilePopover';
import RegisterButton from './RegisterButton';

const Menu = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className=' flex'>
      <Navigation></Navigation>
      {session?.user ? (
        <>
          <ProfilePopover></ProfilePopover>
        </>
      ) : (
        <>
          <LoginButton></LoginButton>
          <RegisterButton></RegisterButton>
        </>
      )}
    </div>
  );
};

export default Menu;
