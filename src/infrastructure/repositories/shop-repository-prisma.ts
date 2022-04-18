import { IShopRepository } from '@domain/shop/shop-repository';
import { Image, PrismaClient, Shop } from '@prisma/client';
import { ShopEntity } from '@domain/shop/shop-entity';
import { createMockOfShopEntity } from '@domain/shop/__tests__/shop-entity.mock';
import { mapPrismaErrorToDomain } from '@infrastructure/orm/prisma/map-prisma-error-to-domain';

const mapPersistedShopToEntity = (
    persistedShop: Shop & { bannerImage?: Image | null },
): ShopEntity => ({
    bannerImageUrl: persistedShop.bannerImage?.filename || null, // TODO replace by URL
    countFollowers: persistedShop.countOfFollowers,
    creationDate: persistedShop.createdAt,
    description: persistedShop.description,
    handle: persistedShop.handle,
    id: persistedShop.id,
    name: persistedShop.name,
});

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

        return persistedShop && mapPersistedShopToEntity(persistedShop);
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

        return persistedShop && mapPersistedShopToEntity(persistedShop);
    },
    merge: async (entity, shopId) => {
        const persistedShop = await prismaClient.shop
            .update({
                data: {
                    description: entity.description,
                    name: entity.name,
                },
                where: {
                    id: shopId,
                },
            })
            .catch((error) => {
                throw mapPrismaErrorToDomain(error);
            });

        return mapPersistedShopToEntity(persistedShop);
    },
    persist: async (entity, ownerUserId) => {
        const persistedShop = await prismaClient.shop
            .create({
                data: {
                    countOfFollowers: 0,
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
                throw mapPrismaErrorToDomain(error);
            });

        return mapPersistedShopToEntity(persistedShop);
    },
});
