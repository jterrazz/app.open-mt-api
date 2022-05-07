import { HashedPasswordEntity } from '@domain/encryption/hashed-password.entity';

export type UserEntity = {
    id: number;
    email: string;
    handle: string; // TODO DELETE !!!!!!!!!!
    firstName: string;
    lastName: string;
    hashedPassword: HashedPasswordEntity;
};
