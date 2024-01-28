'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

type Props = {
  className?: string;
};

const ProfileEditButton = ({ className }: Props) => {
  return (
    <Button variant={'outline'} onClick={() => {}} className={className}>
      프로필변경
    </Button>
  );
};

export default ProfileEditButton;
