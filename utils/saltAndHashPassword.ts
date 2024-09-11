const bcrypt = require('bcrypt');

export async function saltAndHashPassword(password: string) {
  const saltRounds = 10; 
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password:string, passwordUser:string) {
    return await bcrypt.compare(password, passwordUser)
};