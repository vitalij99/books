'use server';
import { auth, prisma } from '@/auth';
import { getBookImageLinkAll } from '@/back';
import { BookSaveDB } from '@/types/book';

interface SetSaveBook {
  title: string;
  link: string;
  chapter?: string[];
  web: string;
  tags?: string[];
}
type DbBooksBase = Omit<BookSaveDB, 'chapter'>;
interface DbBooks extends DbBooksBase {
  chapter: string | null;
}

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

export const getUserEmail = async (email: string) => {
  return await prisma.user.findFirst({ where: { email } });
};

export const setSaveBook = async ({
  title,
  link,
  chapter,
  web,
  tags = [],
}: SetSaveBook) => {
  try {
    const session = await auth();

    if (!session?.user || !session?.user.email) return;

    const image = await getBookImageLinkAll({ book: title, web });

    const transformToJsonChapter = chapter?.toString();

    const data = {
      title,
      link,
      chapter: transformToJsonChapter,
      image,
      web,
      tags,
      userEmail: session.user.email,
    };

    const res = await prisma.books.create({ data });

    const allChapter = res.chapter?.split(',');

    return { ...res, chapter: allChapter };
  } catch (error) {
    console.error(`Error Setsavebook:`, error);
    return undefined;
  }
};

export const getSaveBooks = async () => {
  try {
    const session = await auth();

    if (!session?.user || !session?.user.email) return;

    if (session?.user && session?.user?.email) {
      const res = await prisma.books.findMany({
        where: { userEmail: session.user.email },
      });

      const newRes = transStringToArrChapter(res);
      return newRes;
    }
  } catch (error) {
    console.error(`Error getSaveBooks:`, error);
    return undefined;
  }
};

export const deleteSaveBooks = async (id: string) => {
  const session = await auth();
  if (!session?.user || !session?.user.email) return;

  if (session?.user || session?.user?.id) {
    await prisma.books.delete({ where: { id, userEmail: session.user.email } });
    const res = await prisma.books.findMany({
      where: { userEmail: session.user.email },
    });

    return transStringToArrChapter(res);
  }
};

export const updateChapter = async (id: string, chapter: string[]) => {
  const session = await auth();
  if (!session?.user || !session?.user.email) return;

  if (session?.user || session?.user?.id) {
    const deleteChapter = await prisma.books.update({
      where: { id, userEmail: session.user.email },
      data: {
        chapter: chapter.toString(),
      },
    });
    const allChapter = deleteChapter.chapter?.split(',');
    return { ...deleteChapter, chapter: allChapter };
  }
};

export const updateChapterLastReader = async (id: string, chapter: string) => {
  const session = await auth();
  if (!session?.user || !session?.user.email) return;

  if (session?.user || session?.user?.id) {
    const res = await prisma.books.update({
      where: { id, userEmail: session.user.email },
      data: {
        lastReadeChapter: chapter,
      },
    });

    return res;
  }
};

const transStringToArrChapter = (books: DbBooks[]) => {
  return books.map(book => {
    const chapter = book.chapter?.split(',');
    return { ...book, chapter };
  });
};
