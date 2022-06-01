import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { serializeLoginKoaResponse } from '@adapters/serializers/routes/authentication/serialize-login-koa-response';

describe('serializeLoginKoaResponse()', () => {
    test('with a basic response', async () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        serializeLoginKoaResponse(mockOfCtx);

        // Then
        expect(mockOfCtx.status).toEqual(200);
    });
});
