import { createEndToEndApplication } from '@tests/utils/create-end-to-end-application';
import { seedDatabaseWithProduct } from '@tests/seeds/seed-database-with-product';

const { database, requestAgent } = createEndToEndApplication();

describe('END TO END - GET /products/:productId', () => {
    test('get an existing product', async () => {
        // Given
        const { product: seededProduct } = await seedDatabaseWithProduct(
            database.client,
        );

        // When
        const response = await requestAgent.get(
            '/products/' + seededProduct.id,
        );

        // Then
        expect(response.status).toEqual(200);

        // FIXME
        // expect(response.body).toEqual({
        //     currency: seededProduct.priceCurrency,
        //     description: seededProduct.description,
        //     // imageUrl: seededProduct, // TODO
        //     name: seededProduct.name,
        //     price: seededProduct.priceCentsAmount,
        // });
    });
});
