'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  href: string;
  className?: string;
};

const ProfileEditButton = ({ className, href }: Props) => {
  const router = useRouter();
  return (
    <Button
      variant={'outline'}
      onClick={() => {
        router.push(`/modifyProfile/${href}`);
      }}
      className={className}
    >
      프로필변경
    </Button>
  );
};

export default ProfileEditButton;
