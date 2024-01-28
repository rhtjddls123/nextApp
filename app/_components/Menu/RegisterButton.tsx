'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const RegisterButton = () => {
  const route = useRouter();
  return (
    <Button variant={'outline'} onClick={() => route.push('register')}>
      회원가입
    </Button>
  );
};

export default RegisterButton;
