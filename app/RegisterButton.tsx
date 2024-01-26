'use client';

import { useRouter } from 'next/navigation';

const RegisterButton = () => {
  const route = useRouter();
  return <button onClick={() => route.push('register')}>회원가입</button>;
};

export default RegisterButton;
