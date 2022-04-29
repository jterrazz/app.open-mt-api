import * as bcrypt from 'bcrypt';
import { CheckPassword } from '@domain/encryption/check-password';

export const checkBcryptPassword: CheckPassword = (
    password,
    hashedPassword,
) => {
    return bcrypt.compare(password, hashedPassword);
};
