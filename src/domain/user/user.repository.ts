import { UserEntity } from './user.entity';

export interface IUserRepository {
    findById: (id: number) => Promise<UserEntity | null>;
    findByEmail: (handle: string) => Promise<UserEntity | null>;
    persist: (
        user: Pick<
            UserEntity,
            'email' | 'firstName' | 'lastName' | 'hashedPassword'
        >,
    ) => Promise<UserEntity>;
}
