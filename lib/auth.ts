"use server"
import { signIn } from "@/auth"

export async function login() {

    const res = await signIn('google')
   
 return res
}