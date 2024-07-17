"use server"
import { auth, prisma } from "@/auth";
import { getBookImageLinkAll } from "@/back";



export const getUsers = async () => {
  return await prisma.user.findMany()
}

interface SetSaveBook {
  title: string;
  link: string;
  chapter?: number; 
  web: string;
}

export const setSaveBook = async ({title,link,chapter=0,web}:SetSaveBook) => {
  const session = await auth()

  if (!session?.user || !session?.user?.id) return

  const image = await getBookImageLinkAll({book:title,web})
  
  const data = {
    title,
    link,
    chapter,
    image,
    userId: session.user.id
  }
  const res = await prisma.books.create({data   
  })
  return res
}

export const getSaveBooks = async () => {
  const session = await auth()
   if (!session?.user || !session?.user?.id)  return

  if (session?.user || session?.user?.id) {
    const res = await prisma.books.findMany({where:{userId:session.user.id}})
    return res
  }
}