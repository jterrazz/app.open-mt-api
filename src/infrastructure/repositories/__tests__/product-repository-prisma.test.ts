import { Currency } from '@domain/price/currency';
import { getDependencies } from '@configuration/dependencies';
import { productRepositoryPrismaFactory } from '@infrastructure/repositories/product.prisma-repository';
import { seedDatabaseWithProduct } from '@tests/seeds/seed-database-with-product';
import { seedDatabaseWithShop } from '@tests/seeds/seed-database-with-shop';

const databaseClient = getDependencies().database.client;
const repository = productRepositoryPrismaFactory(databaseClient);

describe('productRepositoryPrisma', () => {
    describe('findByProductId()', () => {
        test('returns data of a product', async () => {
            // Given
            const { product: seededProduct } = await seedDatabaseWithProduct(
                databaseClient,
            );

            // When
            const result = await repository.findByProductId(seededProduct.id);

            // Then
            expect(result).toEqual({
                id: seededProduct.id,
                name: 'the_product_name',
                priceCentsAmount: 1,
                priceCurrency: 'EUR',
                shopId: seededProduct.shopId,
            });
        });
    });

    describe('update()', () => {
        test('updates the data of a product', async () => {
            // Given
            const { product: seededProduct } = await seedDatabaseWithProduct(
                databaseClient,
            );
            const newProductData = {
                name: 'the_new_product_name',
                priceCentsAmount: 2,
                priceCurrency: 'USD' as Currency,
            };

            // When
            const result = await repository.update(
                seededProduct.id,
                newProductData,
            );

            // Then
            expect(result).toEqual({
                id: seededProduct.id,
                name: newProductData.name,
                priceCentsAmount: newProductData.priceCentsAmount,
                priceCurrency: newProductData.priceCurrency,
                shopId: seededProduct.shopId,
            });
            // TODO Check in DB too
        });
    });

    describe('add()', () => {
        test('adds a product to database', async () => {
            const { shop: seededShop } = await seedDatabaseWithShop(
                databaseClient,
            );
            const newProductData = {
                name: 'the_new_product_name',
                priceCentsAmount: 2,
                priceCurrency: 'USD' as Currency,
            };

            // When
            const result = await repository.add(newProductData, seededShop.id);

            // Then
            expect(result).toEqual({
                id: expect.any(Number),
                name: newProductData.name,
                priceCentsAmount: newProductData.priceCentsAmount,
                priceCurrency: newProductData.priceCurrency,
                shopId: expect.any(Number),
            });
            expect(
                await databaseClient.product.findFirst({
                    where: {
                        id: result.id,
                    },
                }),
            ).toEqual({
                createdAt: expect.any(Date),
                description: null,
                id: expect.any(Number),
                name: 'the_new_product_name',
                priceCentsAmount: 2,
                priceCurrency: 'USD',
                shopId: expect.any(Number),
                updatedAt: expect.any(Date),
            });
        });
    });
});
