import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import AuthSession from './AuthSession';
import Menu from './_components/Menu/Menu';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthSession>
          <div>
            <Menu></Menu>
          </div>
          {children}
        </AuthSession>
      </body>
    </html>
  );
}
