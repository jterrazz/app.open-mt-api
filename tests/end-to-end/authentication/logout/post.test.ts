import { createEndToEndApplication } from '@tests/utils/create-end-to-end-application';

const { createAuthenticatedRequestAgent } = createEndToEndApplication();

describe('END TO END - POST /authentication/logout', () => {
    test('log out a user', async () => {
        // Given
        const { authenticatedRequestAgent } =
            await createAuthenticatedRequestAgent();

        // When
        const response = await authenticatedRequestAgent.post(
            '/authentication/logout',
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
        expect(response.headers['set-cookie'][0]).toEqual(
            'koa.sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
        );
    });
});
