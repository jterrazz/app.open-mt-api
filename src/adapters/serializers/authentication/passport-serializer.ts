import { UserEntity } from '@domain/user/user.entity';

export const passportSerializer = (
    user: UserEntity,
    done: (err: Error | null, userId?: number) => void,
) => {
    done(null, user.id);
};
