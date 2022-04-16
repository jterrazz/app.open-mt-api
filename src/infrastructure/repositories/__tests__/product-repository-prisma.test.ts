import { initDependencies } from '@configuration/dependencies';
import { productRepositoryPrismaFactory } from '@infrastructure/repositories/product-repository-prisma';
import { seedDatabaseWithProduct } from '@tests/seeds/product';

describe('productRepositoryPrisma', () => {
    const databaseClient = initDependencies().database.client;
    const repository = productRepositoryPrismaFactory(databaseClient);

    describe('findById()', () => {
        test('finds an existing product', async () => {
            // Given
            const seededProduct = await seedDatabaseWithProduct(databaseClient);

            // When
            const result = await repository.findById(seededProduct.id);

            // Then
            expect(result).toEqual({
                id: seededProduct.id,
                name: 'the_product_name',
                priceCentsAmount: 4200,
                priceCurrency: 'EUR',
                shopId: seededProduct.shopId,
            });
        });
    });
});
