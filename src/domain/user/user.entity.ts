import { HashedPasswordEntity } from '@domain/encryption/hashed-password.entity';
import { LANGUAGE } from '@domain/user/language';

export type UserEntity = {
    id: number;
    authentication: {
        email: string;
        hashedPassword: HashedPasswordEntity;
    };
    profile: {
        firstName: string;
        lastName: string;
    };
    settings: {
        language: LANGUAGE;
    };
};
