import { IUserRepository } from '@domain/user/user.repository';
import { LANGUAGE } from '@domain/user/language';
import { PrismaClient, User } from '@prisma/client';
import { UserEntity } from '@domain/user/user.entity';
import { mapPrismaErrorToDomain } from '@infrastructure/orm/prisma/map-prisma-error-to-domain';

const mapPersistedUserToUserEntity = (persistedUser: User): UserEntity => ({
    authentication: {
        email: persistedUser.email,
        hashedPassword: persistedUser.hashedPassword,
    },
    id: persistedUser.id,
    profile: {
        firstName: persistedUser.firstName,
        lastName: persistedUser.lastName,
    },
    settings: {
        language: persistedUser.language as LANGUAGE,
    },
});

export const userRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IUserRepository => ({
    async add(user) {
        const persistedUser = await prismaClient.user
            .create({
                data: {
                    email: user.authentication.email,
                    firstName: user.profile.firstName,
                    hashedPassword: user.authentication.hashedPassword,
                    language: user.settings.language,
                    lastName: user.profile.lastName,
                },
            })
            .catch((error) => {
                throw mapPrismaErrorToDomain(error);
            });

        return persistedUser && mapPersistedUserToUserEntity(persistedUser);
    },
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
});
