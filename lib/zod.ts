import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Електронна пошта є обов'язковою" })
    .min(1, "Електронна пошта є обов'язковою")
    .email("Неправильний формат електронної пошти"),
  password: string({ required_error: "Пароль є обов'язковим" })
    .min(1, "Пароль є обов'язковим")
    .min(8, "Пароль має бути не менше 8 символів")
    .max(32, "Пароль має бути не більше 32 символів"),
});