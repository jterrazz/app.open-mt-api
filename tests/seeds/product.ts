import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { generateRandomId } from '@application/utils/math';
import { seedDatabaseWithShop } from '@tests/seeds/shop';
import type { Product } from '@prisma/client';

export const seedDatabaseWithProduct = async (
    databaseClient: IPrismaDatabase['client'],
    partialProduct: Partial<Product> = {},
) => {
    const { shop: seededShop } = await seedDatabaseWithShop(databaseClient, {
        name: 'the_shop_to_seed_products',
    });

    const product = await databaseClient.product.create({
        data: {
            description: 'the_product_description',
            id: Math.floor(generateRandomId()),
            name: 'the_product_name',
            priceCentsAmount: 1,
            priceCurrency: 'EUR',
            shopId: seededShop.id,
            ...partialProduct,
        },
    });

    return {
        id: product.id,
        shopId: product.shopId,
    };
};
