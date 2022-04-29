import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user.repository';
import { UserEntity } from '@domain/user/user.entity';

export type GetUserPublicProfile = (
    id: number,
) => Promise<Pick<UserEntity, 'firstName' | 'lastName'> | null>;

export const getUserPublicProfileFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
): GetUserPublicProfile => {
    return async (id) => {
        const user = await userRepository.findById(id);

        return (
            user && {
                firstName: user.firstName,
                lastName: user.lastName,
                // FIXME To be completed
            }
        );
    };
};
