// mark as client component
'use client';

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
        <p>Welcome {session.user?.name}. Signed In As</p>
        <Image
          src={session.user?.image as string}
          fill
          alt=""
          className="object-cover rounded-full"
        />
        <p>{session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  // rendering components for not logged in users
  return (
    <>
      <button onClick={() => signIn('github')}>Sign in with github</button>
    </>
  );
}
