import { IShopsFollowedByUsersRepository } from '@domain/user/shops-followed-by-users.repository';
import { PrismaClient } from '@prisma/client';
import { mapPersistedShopToShopEntity } from '@infrastructure/repositories/shop.prisma-repository';

export const shopsFollowedByUsersPrismaRepositoryFactory = (
    prismaClient: PrismaClient,
): IShopsFollowedByUsersRepository => {
    return {
        findByUserId: async (userId) => {
            const persistedShops =
                await prismaClient.shopsFollowedByUsers.findMany({
                    include: {
                        shop: true,
                    },
                    // select: {
                    //     shop: {
                    //         select: {
                    //             name: true,
                    //         },
                    //     },
                    // },
                    where: {
                        userId,
                    },
                });

            return persistedShops
                .map((persistedShop) => persistedShop.shop)
                .map(mapPersistedShopToShopEntity);
        },
    };
};
