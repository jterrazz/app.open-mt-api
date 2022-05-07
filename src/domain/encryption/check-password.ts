import { HashedPasswordEntity } from '@domain/encryption/hashed-password.entity';

export type CheckPassword = (
    password: string,
    hashedPassword: HashedPasswordEntity,
) => Promise<boolean>;
