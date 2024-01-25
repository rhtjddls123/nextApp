'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

const LogoutButton = () => {
  return <button onClick={() => signOut()}>로그아웃</button>;
};

export default LogoutButton;
