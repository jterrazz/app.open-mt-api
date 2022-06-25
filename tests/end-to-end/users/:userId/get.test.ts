import { createEndToEndApplication } from '@tests/utils/create-end-to-end-application';
import { seedDatabaseWithUser } from '@tests/seeds/seed-database-with-user';

const { database, requestAgent } = createEndToEndApplication();

describe('END TO END - GET /users', function () {
    test('get an existing user', async () => {
        // Given
        const seededUser = await seedDatabaseWithUser(database.client);

        // When
        const response = await requestAgent.get('/users/' + seededUser.id);

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            firstName: seededUser.firstName,
            lastName: seededUser.lastName,
        });
    });

    test('does not get a missing user', async () => {
        // Given
        const deadUserId = 1000000000;

        // When
        const response = await requestAgent.get('/users/' + deadUserId);

        // Then
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: 'not found',
        });
    });
});
