import { UserEntity } from './user.entity';

export interface IUserRepository {
    findById: (id: number) => Promise<UserEntity | null>;
    findByEmail: (handle: string) => Promise<UserEntity | null>;
    add: (user: {
        authentication: Pick<
            UserEntity['authentication'],
            'email' | 'hashedPassword'
        >;
        profile: Pick<UserEntity['profile'], 'firstName' | 'lastName'>;
        settings: Pick<UserEntity['settings'], 'language'>;
    }) => Promise<UserEntity>;
}
