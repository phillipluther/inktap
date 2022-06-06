import bcrypt from 'bcryptjs';

const prefix = '2a'; // it's a bcrypt thing
const workFactor = 10;

export const hashCheck = `$${prefix}$${workFactor}`;

export default (str: string) => {
  const isHashed = str.indexOf(hashCheck) === 0;

  return isHashed ? str : bcrypt.hashSync(str, workFactor);
};
