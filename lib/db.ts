"use server"
import { auth, prisma } from "@/auth";


export const getUsers = async () => {
  return await prisma.user.findMany()
}

export const setSaveBook = async () => {
  const sesion = await auth()
  console.log(sesion);
  const data = {
    title:"",
    link: "",
    chapter: 0,
    image: "",
    users: ""
  }
  const res = await prisma.books.create({data})
  return res
}

export const getSaveBooks = async () => {
  const session = await auth()
  if (session?.user) {
    const res = await prisma.books.findMany({where:{users:session?.user}})
    return res
  }
}