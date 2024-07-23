"use server"
import { auth, prisma } from "@/auth";
import { getBookImageLinkAll } from "@/back";



export const getUsers = async () => {
  return await prisma.user.findMany()
}

interface SetSaveBook {
  title: string;
  link: string;
  chapter?: number[]; 
  web: string;
}

export const setSaveBook = async ({title,link,chapter,web}:SetSaveBook) => {
  const session = await auth()

  if (!session?.user || !session?.user?.id) return

  const image = await getBookImageLinkAll({book:title,web})
  
  const transformToJsonChapter = chapter?.toString()
  console.log(transformToJsonChapter);

  const data = {
    title,
    link,
    chapter:transformToJsonChapter,
    image,
    userId: session.user.id
  }
  const res = await prisma.books.create({data   
  })
  const allChapter = res.chapter?.split(",")
  const chapterArr = allChapter?.map(chapter=>Number(chapter))
  return { ...res, chapter:chapterArr }
  
}

export const getSaveBooks = async () => {
  const session = await auth()
   if (!session?.user || !session?.user?.id)  return

  if (session?.user || session?.user?.id) {
    const res = await prisma.books.findMany({ where: { userId: session.user.id } })
    
   const newRes = transStringToArrChapter(res)
    return newRes
  }
}

export const deleteSaveBooks = async (id:string) => {
  const session = await auth()
  if (!session?.user || !session?.user?.id) return
  
  if (session?.user || session?.user?.id) {
    await prisma.books.delete({ where: { id } })    
    const res = await prisma.books.findMany({ where: { userId: session.user.id } })
    
    return transStringToArrChapter(res)
  
  }
}

const transStringToArrChapter = (books: {
    id: string;
    title: string;
    link: string;
    chapter: string | null;
    image: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}[]) => { 

return books.map((book)=>{
  const allChapter = book.chapter?.split(",")
  const chapter = allChapter?.map(chapter=>Number(chapter))
  return { ...book, chapter } } )
  
 }  
