import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  src?: string | null;
};

export function ProfileAvatar({ src }: Props) {
  return (
    <Avatar className=' w-24 h-24'>
      <AvatarImage src={src || '/avatar.PNG'} alt='profile' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
