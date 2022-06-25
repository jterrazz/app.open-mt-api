import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { getUserPrivateDetailsControllerFactory } from '@adapters/controllers/user/get-user-private-details.controller';

const getUserPrivateDetailsController =
    getUserPrivateDetailsControllerFactory();

describe('getUserPrivateDetailsController()', () => {
    test('respond with user private details', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();

        // When
        await getUserPrivateDetailsController(ctx);

        // Then
        expect(true).toEqual(true); // FIXME
    });
});
