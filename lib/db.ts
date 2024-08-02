'use server';
import { auth, prisma } from '@/auth';
import { getBookImageLinkAll } from '@/back';
import { BooksSaveDB } from '@/types/book';

interface SetSaveBook {
  title: string;
  link: string;
  chapter?: number[];
  web: string;
}
type DbBooksBase = Omit<BooksSaveDB, 'chapter'>;
interface DbBooks extends DbBooksBase {
  chapter: string | null;
}

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const setSaveBook = async ({
  title,
  link,
  chapter,
  web,
}: SetSaveBook) => {
  try {
    const session = await auth();

    if (!session?.user || !session?.user?.id) return;

    const image = await getBookImageLinkAll({ book: title, web });

    const transformToJsonChapter = chapter?.toString();

    const data = {
      title,
      link,
      chapter: transformToJsonChapter,
      image,
      web,
      userId: session.user.id,
    };

    const res = await prisma.books.create({ data });
    const allChapter = res.chapter?.split(',');
    const chapterArr = allChapter?.map(chapter => Number(chapter));
    return { ...res, chapter: chapterArr };
  } catch (error) {
    return undefined;
  }
};

export const getSaveBooks = async () => {
  try {
    const session = await auth();
    if (!session?.user || !session?.user?.id) return;

    if (session?.user || session?.user?.id) {
      const res = await prisma.books.findMany({
        where: { userId: session.user.id },
      });

      const newRes = transStringToArrChapter(res);
      return newRes;
    }
  } catch (error) {
    return undefined;
  }
};

export const deleteSaveBooks = async (id: string) => {
  const session = await auth();
  if (!session?.user || !session?.user?.id) return;

  if (session?.user || session?.user?.id) {
    await prisma.books.delete({ where: { id, userId:session.user.id } });
    const res = await prisma.books.findMany({
      where: { userId: session.user.id },
    });

    return transStringToArrChapter(res);
  }
};

export const updateChapter = async (id: string, chapter: number[]) => {
  const session = await auth();
  if (!session?.user || !session?.user?.id) return;

  if (session?.user || session?.user?.id) {
    const deleteChapter = await prisma.books.update({
      where: { id, userId:session.user.id  },
      data: {
        chapter: chapter.toString(),
      },
    });
    const allChapter = deleteChapter.chapter?.split(',');
    const chapters = allChapter?.map(chapter => Number(chapter));
    return { ...deleteChapter, chapter: chapters };
  }
};

export const updateChapterLastReader = async (id: string, chapter: number) => {
    const session = await auth();
  if (!session?.user || !session?.user?.id) return;

  if (session?.user || session?.user?.id) {
    const res = await prisma.books.update({
      where: { id, userId:session.user.id  },
      data: {
        lastReadeChapter: chapter,
      },
    });
   
    return res;
  }
}

const transStringToArrChapter = (books: DbBooks[]) => {
  return books.map(book => {
    const allChapter = book.chapter?.split(',');
    const chapter = allChapter?.map(chapter => Number(chapter));
    return { ...book, chapter };
  });
};
