import { IProductRepository } from '@domain/product/product-repository';
import { PrismaClient, Product } from '@prisma/client';
import { ProductEntity } from '@domain/product/product-entity';

const mapPersistedProductToProduct = (
    persistedProduct: Product,
): ProductEntity => ({
    id: persistedProduct.id,
    name: persistedProduct.name,
    priceCentsAmount: persistedProduct.priceCentsAmount,
    priceCurrency: persistedProduct.priceCurrency,
    shopId: persistedProduct.shopId,
});

export const productRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IProductRepository => ({
    findByProductId: async (id) => {
        const persistedProduct = await prismaClient.product.findFirst({
            where: {
                id,
            },
        });

        return (
            persistedProduct && mapPersistedProductToProduct(persistedProduct)
        );
    },
    merge: async (productId, productParams) => {
        const persistedProduct = await prismaClient.product.update({
            data: {
                name: productParams.name,
                priceCentsAmount: productParams.priceCentsAmount,
                priceCurrency: productParams.priceCurrency,
            },
            where: {
                id: productId,
            },
        });

        return mapPersistedProductToProduct(persistedProduct);
    },
    persist: async (productParams, shopId) => {
        const persistedProduct = await prismaClient.product.create({
            data: {
                name: productParams.name,
                priceCentsAmount: productParams.priceCentsAmount,
                priceCurrency: productParams.priceCurrency,
                shopId,
            },
        });

        return mapPersistedProductToProduct(persistedProduct);
    },
});
