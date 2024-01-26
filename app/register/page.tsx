import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import Register from './Register';

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect('/');
  return <Register></Register>;
};

export default RegisterPage;
