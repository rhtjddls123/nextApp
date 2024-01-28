import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import ProfileButton from './ProfileButton';
import ProfileContent from './ProfileContent';

export async function ProfilePopover() {
  const session = await getServerSession(authOptions);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ProfileButton session={session}></ProfileButton>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <ProfileContent session={session} />
      </PopoverContent>
    </Popover>
  );
}
