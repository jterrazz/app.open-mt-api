import { IProductRepository } from '@domain/product/product-repository';
import { PrismaClient } from '@prisma/client';
import { createMockOfProductEntity } from '@domain/product/__tests__/product-entity.mock';

export const productRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IProductRepository => ({
    findById: async (id) => {
        const persistedProduct = await prismaClient.product.findFirst({
            where: {
                id,
            },
        });

        if (!persistedProduct) {
            return null;
        }

        return {
            id: persistedProduct.id,
            name: persistedProduct.name,
            priceCentsAmount: persistedProduct.priceCentsAmount,
            priceCurrency: persistedProduct.priceCurrency,
            shopId: persistedProduct.shopId,
        };
    },
    merge: async (product) => {
        return product; // TODO Implement
    },
    persist: async (product) => {
        return createMockOfProductEntity(); // TODO Implement
    },
});
