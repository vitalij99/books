'use client';

import { login } from '@/lib/auth';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Auth() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Image
          src={session.user?.image as string}
          width={50}
          height={50}
          alt=""
          className="object-cover rounded-full"
        />

        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <button onClick={() => login()}>Sign in</button>
    </>
  );
}
