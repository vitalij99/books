// mark as client component
'use client';

import { login } from '@/lib/auth';
// importing necessary functions
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Auth() {
  // extracting data from usesession as session
  const { data: session } = useSession();

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
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

  // rendering components for not logged in users
  return (
    <>
      <button onClick={() => login()}>Sign in with github</button>
    </>
  );
}
