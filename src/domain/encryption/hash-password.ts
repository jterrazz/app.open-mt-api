import { HashedPasswordEntity } from '@domain/encryption/hashed-password.entity';

export type HashPassword = (password: string) => Promise<HashedPasswordEntity>;
