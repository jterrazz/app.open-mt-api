import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { Shop } from '@prisma/client';
import { seedDatabaseWithShop } from '@tests/seeds/shop';
import { seedDatabaseWithUser } from '@tests/seeds/user';

export const seedDatabaseWithShopsFollowedByUsers = async (
    databaseClient: IPrismaDatabase['client'],
    shopsId: Array<number> = [],
) => {
    let shop: Shop | undefined;
    const user = await seedDatabaseWithUser(databaseClient);
    const shopsToFollow: Array<{ shopId: number; userId: number }> = [];

    if (shopsId.length === 0) {
        const seededShop = await seedDatabaseWithShop(databaseClient);

        shop = seededShop.shop;
        shopsToFollow.push({
            shopId: seededShop.shop.id,
            userId: user.id,
        });
    } else {
        shopsToFollow.push(
            ...shopsId.map((shopId) => ({
                shopId,
                userId: user.id,
            })),
        );
    }

    await databaseClient.shopsFollowedByUsers.createMany({
        data: shopsToFollow,
        skipDuplicates: true,
    });

    return {
        shop,
        user,
    };
};
