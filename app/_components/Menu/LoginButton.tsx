'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const LoginButton = () => {
  return (
    <Button onClick={() => signIn()} variant={'outline'}>
      로그인
    </Button>
  );
};

export default LoginButton;
