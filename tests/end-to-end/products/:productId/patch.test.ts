import { createEndToEndApplication } from '@tests/utils/create-end-to-end-application';
import { seedDatabaseWithProduct } from '@tests/seeds/seed-database-with-product';
import { seedDatabaseWithShop } from '@tests/seeds/seed-database-with-shop';

const { database, createAuthenticatedRequestAgent, requestAgent } =
    createEndToEndApplication();

const createSeedOfProduct = async () => {
    const { authenticatedRequestAgent, seededUser } =
        await createAuthenticatedRequestAgent();
    const { shop } = await seedDatabaseWithShop(
        database.client,
        {},
        seededUser.id,
    );
    const { product } = await seedDatabaseWithProduct(
        database.client,
        {},
        shop.id,
    );

    return {
        authenticatedRequestAgent,
        product,
    };
};

describe('END TO END - PATCH /products/:productId', () => {
    test('update an existing product', async () => {
        // Given
        const { authenticatedRequestAgent, product } =
            await createSeedOfProduct();
        const updatedProduct = {
            name: 'updated-product-name',
        };

        // When
        const response = await authenticatedRequestAgent
            .patch('/products/' + product.id)
            .send(updatedProduct);

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: product.id,
            name: updatedProduct.name,
            priceCentsAmount: product.priceCentsAmount,
            priceCurrency: product.priceCurrency,
        });
    });

    test('does not update a product of an other user', async () => {
        // Given
        const { authenticatedRequestAgent } =
            await createAuthenticatedRequestAgent();
        const { product } = await seedDatabaseWithProduct(database.client);
        const updatedProduct = {
            name: 'updated-product-name',
        };

        // When
        const response = await authenticatedRequestAgent
            .patch('/products/' + product.id)
            .send(updatedProduct);

        // Then
        expect(response.status).toEqual(403);
        expect(response.body).toEqual({
            message: 'forbidden request',
        });
    });

    test('does not update a product that does not exist', async () => {
        // Given
        const { authenticatedRequestAgent } =
            await createAuthenticatedRequestAgent();
        const updatedProduct = {
            name: 'updated-product-name',
        };

        // When
        const response = await authenticatedRequestAgent
            .patch('/products/' + '0')
            .send(updatedProduct);

        // Then
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: 'unknown product',
        });
    });

    test('return 401 if not authenticated', async () => {
        // Given
        const { product } = await seedDatabaseWithProduct(database.client);
        const updatedProduct = {
            name: 'updated-product-name',
        };

        // When
        const response = await requestAgent
            .patch('/products/' + product.id)
            .send(updatedProduct);

        // Then
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({
            message: 'authentication required',
        });
    });
});
