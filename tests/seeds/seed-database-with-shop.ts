import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { User } from '@prisma/client';
import { generateRandomId } from '@application/utils/math';
import { randomUUID } from 'crypto';
import { seedDatabaseWithUser } from '@tests/seeds/seed-database-with-user';
import type { Shop } from '@prisma/client';

export const seedDatabaseWithShop = async (
    databaseClient: IPrismaDatabase['client'],
    partialShop: Partial<Shop> = {},
    ownerId?: number,
) => {
    let user: User | undefined;

    if (!ownerId) {
        const seededUser = await seedDatabaseWithUser(databaseClient);
        ownerId = seededUser.id;
        user = seededUser;
    }

    const shop = await databaseClient.shop.create({
        data: {
            bannerImageId: null,
            countOfFollowers: 0,
            createdAt: new Date(),
            description: 'the_shop_description',
            handle: randomUUID(),
            id: Math.floor(generateRandomId()),
            name: 'the_shop_name',
            userId: ownerId,
            ...partialShop,
        },
    });

    return {
        ownerId,
        shop,
        user,
    };
};
