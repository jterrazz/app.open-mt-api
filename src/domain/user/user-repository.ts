import { UserEntity } from './user-entity';

export interface IUserRepository {
    findByHandle: (handle: string) => Promise<UserEntity | null>;
    findByEmail: (handle: string) => Promise<UserEntity | null>;
    persist: (
        user: Pick<
            UserEntity,
            'email' | 'firstName' | 'lastName' | 'hashedPassword'
        >,
    ) => Promise<UserEntity>;
}
