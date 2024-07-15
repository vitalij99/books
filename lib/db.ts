"use server"
import { auth, prisma } from "@/auth";


export const getUsers = async () => {
  return await prisma.user.findMany()
}

export const setSaveBook = async () => {
  const session = await auth()
  if (!session?.user || !session?.user?.id)  return

  const data = {
    title: "",
    link: "",
    chapter: 0,
    image: "",
    userId: session.user.id
  }
  const res = await prisma.books.create({data   
  })
  return res
}

export const getSaveBooks = async () => {
  const session = await auth()
   if (!session?.user || !session?.user?.id)  return
    const user =  await prisma.user.findFirst({where: {id:session.user.id}})
  if (!user) return

  console.log(user);

  if (session?.user || session?.user?.id) {
    const res = await prisma.books.findMany({})
    return res
  }
}