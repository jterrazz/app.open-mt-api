import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { randomUUID } from 'crypto';
import type { User } from '@prisma/client';

export const seedDatabaseWithUser = async (
    database: IPrismaDatabase['client'],
    partialUser: Partial<User> = {},
) => {
    const { user } = await database.$transaction(
        async (prismaTransactionClient) => {
            const settings = await prismaTransactionClient.userSettings.create({
                data: {
                    language: 'FR',
                },
            });

            const user = await prismaTransactionClient.user.create({
                data: {
                    email: partialUser.email || `${randomUUID()}@mail.com`,
                    firstName: partialUser.firstName || 'the_user_first_name',
                    handle: partialUser.handle || randomUUID(),
                    hashedPassword:
                        partialUser.hashedPassword ||
                        'the_user_hashed_password',
                    lastName: partialUser.lastName || 'the_user_last_name',
                    userSettingsId: settings.id,
                },
            });

            return { settings, user };
        },
    );

    return user;
};
