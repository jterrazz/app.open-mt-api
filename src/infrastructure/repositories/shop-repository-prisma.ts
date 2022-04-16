import { DuplicatedFieldError } from '@domain/error/technical/duplicated-field-error';
import { IShopRepository } from '@domain/shop/shop-repository';
import { PrismaClient } from '@prisma/client';

export const shopRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IShopRepository => ({
    findByHandle: async (handle) => {
        const persistedShop = await prismaClient.shop.findFirst({
            include: {
                bannerImage: true,
            },
            where: {
                handle,
            },
        });

        if (!persistedShop) return null;

        return {
            bannerImageUrl: persistedShop.bannerImage?.filename || null, // TODO replace by URL
            countFollowers: persistedShop.countOfFollowers,
            creationDate: persistedShop.createdAt,
            description: persistedShop.description,
            handle: persistedShop.handle,
            id: persistedShop.id,
            name: persistedShop.name,
        };
    },
    findByOwnerId: async (ownerId) => {
        const persistedShop = await prismaClient.shop.findFirst({
            include: {
                bannerImage: true,
            },
            where: {
                userId: ownerId,
            },
        });

        if (!persistedShop) return null;

        return {
            bannerImageUrl: persistedShop.bannerImage?.filename || null, // TODO replace by URL
            countFollowers: persistedShop.countOfFollowers,
            creationDate: persistedShop.createdAt,
            description: persistedShop.description,
            handle: persistedShop.handle,
            id: persistedShop.id,
            name: persistedShop.name,
        };
    },
    merge: async (entity) => {
        return entity;
    },
    persist: async (entity, ownerUserId) => {
        const persistedShop = await prismaClient.shop
            .create({
                data: {
                    countOfFollowers: entity.countFollowers,
                    description: entity.description,
                    handle: entity.handle,
                    name: entity.name,
                    user: {
                        connect: {
                            id: ownerUserId,
                        },
                    },
                },
            })
            .catch((error) => {
                if (
                    (error.code =
                        'code' &&
                        error.meta?.target?.some(
                            (target) => target === 'handle',
                        ))
                ) {
                    // TODO Test
                    // {
                    //     code: 'P2002',
                    //         clientVersion: '3.10.0',
                    //     meta: { target: [ 'handle' ] }
                    // }
                    throw new DuplicatedFieldError('handle');
                }

                throw error;
            });

        return {
            bannerImageUrl: null, // TODO Come back
            countFollowers: 0,
            creationDate: new Date(),
            description: persistedShop.description,
            handle: persistedShop.handle,
            id: persistedShop.id,
            name: persistedShop.name,
        };
    },
});
