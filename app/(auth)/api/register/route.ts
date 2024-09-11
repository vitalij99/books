import { createUser, getUserEmail } from '@/lib/db';
import { signInSchema } from '@/lib/zod';
import { saltAndHashPassword } from '@/utils/saltAndHashPassword';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    signInSchema.parse({ email, password });

    const existingUser = await getUserEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Користувач з таким email вже існує' },
        { status: 400 }
      );
    }

    const hashedPassword = await saltAndHashPassword(password);

    const user = await createUser({ email, password: hashedPassword });

    if (user) {
      return NextResponse.json(
        { message: 'Користувача успішно створено' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: 'Помилка при створенні користувача' },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}
