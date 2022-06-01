// TODO
import { IShopsFollowedByUsersRepository } from '@domain/user/shops-followed-by-users.repository';
import { User } from '@prisma/client';
import { UserEntity } from '@domain/user/user.entity';
import { prismaDatabaseFactory } from '@infrastructure/orm/prisma/prisma-database';

export const getUserPrivateFollowedShopsFactory = (
    shopsFollowedByUsersRepository: IShopsFollowedByUsersRepository,
) => {
    return (authenticatedUser: UserEntity) => {
        return shopsFollowedByUsersRepository.findByUserId(
            authenticatedUser.id,
        );
    };
};
