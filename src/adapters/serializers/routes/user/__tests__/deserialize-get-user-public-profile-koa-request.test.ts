import { UnprocessableEntityClientError } from '@domain/error/client/unprocessable-entity-client-error';
import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { deserializeGetUserPublicProfileKoaRequest } from '@adapters/serializers/routes/user/deserialize-get-user-public-profile-koa-request';

describe('deserializeGetUserPublicProfileKoaRequest()', () => {
    test('succeeds if all params are provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            params: { userId: '42' },
        });

        // When
        const result = deserializeGetUserPublicProfileKoaRequest(ctx);

        // Then
        expect(result).toEqual({ userId: 42 });
    });

    test('fails if all params are provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            params: {},
        });

        // When
        const ft = () => deserializeGetUserPublicProfileKoaRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityClientError);
    });
});
