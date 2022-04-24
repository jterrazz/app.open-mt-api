import { IUserRepository } from '@domain/user/user-repository';
import { PrismaClient, User } from '@prisma/client';
import { UserEntity } from '@domain/user/user-entity';
import { mapPrismaErrorToDomain } from '@infrastructure/orm/prisma/map-prisma-error-to-domain';

const mapPersistedUserToUserEntity = (persistedUser: User): UserEntity => ({
    email: persistedUser.email,
    firstName: persistedUser.firstName,
    handle: persistedUser.handle,
    hashedPassword: persistedUser.hashedPassword,
    id: persistedUser.id,
    lastName: persistedUser.lastName,
});

export const userRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IUserRepository => ({
    async findByEmail(email) {
        const persistedUser = await prismaClient.user.findFirst({
            where: { email },
        });

        return persistedUser && mapPersistedUserToUserEntity(persistedUser);
    },
    async findById(id) {
        // TODO To test
        const persistedUser = await prismaClient.user.findFirst({
            where: { id },
        });

        return persistedUser && mapPersistedUserToUserEntity(persistedUser);
    },
    async persist(user) {
        const persistedUser = await prismaClient.user
            .create({
                data: {
                    email: user.email,
                    firstName: user.firstName,
                    handle: 'todelllll',
                    hashedPassword: user.hashedPassword,
                    lastName: user.lastName,
                    userSettings: {
                        create: {
                            language: 'FR',
                        },
                    },
                    // TODO Created_at and updatedAt
                },
            })
            .catch((error) => {
                throw mapPrismaErrorToDomain(error);
            });

        return persistedUser && mapPersistedUserToUserEntity(persistedUser);
    },
});
