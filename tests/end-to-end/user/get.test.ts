import { createEndToEndApplication } from '@tests/end-to-end/create-end-to-end-application';
import { seedDatabaseWithUser } from '@tests/seeds/user';
import request from 'supertest';

const {
    app,
    database: { client: databaseClient },
} = createEndToEndApplication();

describe('END TO END - GET /user', function () {
    test('get an existing user', async () => {
        // Given
        const seededUserHandle = 'seeded_user_handle';
        const seededUser = await seedDatabaseWithUser(databaseClient, {
            handle: seededUserHandle,
        });

        // When
        const response = await request(app.callback()).get(
            '/user/' + seededUserHandle,
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            firstName: seededUser.firstName,
            lastName: seededUser.lastName,
        });
    });

    test('does not get a missing user', async () => {
        // Given
        const deadUserHandle = 'dead_user_handle';

        // When
        const response = await request(app.callback()).get(
            '/user/' + deadUserHandle,
        );

        // Then
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: 'not found',
        });
    });
});
