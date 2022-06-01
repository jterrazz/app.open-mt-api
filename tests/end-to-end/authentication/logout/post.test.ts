import { createAuthenticatedRequestAgent } from '@tests/utils/create-authenticated-request-agent';
import { createEndToEndApplication } from '../../../utils/create-end-to-end-application';
import { getDependencies } from '@configuration/dependencies';

const endToEndApplication = createEndToEndApplication();
const databaseClient = getDependencies().database.client;

describe('END TO END - POST /auth/login', () => {
    test('log out a user', async () => {
        // Given
        const requestAgent = await createAuthenticatedRequestAgent(
            databaseClient,
            endToEndApplication,
        );

        // When
        const response = await requestAgent.post('/auth/logout');

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
        expect(response.headers['set-cookie'][0]).toEqual(
            'koa.sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
        );
    });
});
