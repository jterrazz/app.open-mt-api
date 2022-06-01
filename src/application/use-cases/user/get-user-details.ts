import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user.repository';
import { UserEntity } from '@domain/user/user.entity';

export type GetUserDetails = (id: number) => Promise<UserEntity | null>;

export const getUserDetailsFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
): GetUserDetails => {
    return async (id) => {
        return userRepository.findById(id);
    };
};
