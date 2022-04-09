import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { generateRandomId } from '@application/utils/math';
import { randomUUID } from 'crypto';
import type { Shop } from '@prisma/client';

export const seedDatabaseWithShop = async (
    databaseClient: IPrismaDatabase['client'],
    partialShop: Partial<Shop> = {},
) => {
    const shop = await databaseClient.shop.create({
        data: {
            bannerImageId: null,
            countOfFollowers: 42,
            createdAt: new Date(),
            description: 'the_shop_description',
            handle: randomUUID(),
            id: Math.floor(generateRandomId()),
            name: 'the_shop_name',
            ...partialShop,
        },
    });

    return {
        createdAt: shop.createdAt,
        handle: shop.handle,
        id: shop.id,
    };
};
