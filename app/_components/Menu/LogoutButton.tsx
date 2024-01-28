'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react';

const LogoutButton = () => {
  return (
    <Button variant={'outline'} onClick={() => signOut()}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
