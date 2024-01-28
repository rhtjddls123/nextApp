'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react';

type Props = {
  className?: string;
};

const LogoutButton = ({ className }: Props) => {
  return (
    <Button variant={'outline'} onClick={() => signOut()} className={className}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
