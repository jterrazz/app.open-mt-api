import * as bcrypt from 'bcrypt';
import { HashPassword } from '@domain/encryption/hash-password';

const SALT_ROUNDS = 10;

export const hashBcryptPassword: HashPassword = async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};
