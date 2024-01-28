import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect('/');
  return (
    <div className=' absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      {children}
    </div>
  );
}
