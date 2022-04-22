import { createEndToEndApplication } from '@tests/end-to-end/create-end-to-end-application';
import { seedDatabaseWithShop } from '@tests/seeds/shop';
import { useFakeTimers, useRealTimers } from '@application/utils/node/timer';
import request from 'supertest';

const {
    app,
    database: { client: databaseClient },
} = createEndToEndApplication();

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('END TO END - GET /shop', function () {
    test('get an existing shop', async () => {
        // Given
        const { shop: shopSeed } = await seedDatabaseWithShop(databaseClient);

        // When
        const response = await request(app.callback()).get(
            '/shop/' + shopSeed.handle,
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            description: 'the_shop_description',
            handle: shopSeed.handle,
            name: 'the_shop_name',
        });
    });

    test('does not get a missing shop', async () => {
        // Given
        const deadShopHandle = 'the_dead_shop_handle';

        // When
        const response = await request(app.callback()).get(
            '/shop/' + deadShopHandle,
        );

        // Then
        expect(response.status).toEqual(404);
    });
});
