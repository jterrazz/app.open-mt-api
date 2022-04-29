import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { serializeLogoutKoaResponse } from '@adapters/serializers/routes/authentication/serialize-logout-koa-response';

describe('serializeLogoutKoaResponse()', () => {
    test('with a basic response', async () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        serializeLogoutKoaResponse(mockOfCtx);

        // Then
        expect(mockOfCtx.status).toEqual(200);
    });
});
