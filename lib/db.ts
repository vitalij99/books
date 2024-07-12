"use server"
import { prisma } from "@/auth";


export const getUsers = async () => {
  return await prisma.user.findMany()

}