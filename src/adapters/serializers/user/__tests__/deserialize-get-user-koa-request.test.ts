import { UnprocessableEntityClientError } from '@domain/error/client/unprocessable-entity-client-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { deserializeGetUserKoaRequest } from '@adapters/serializers/user/deserialize-get-user-koa-request';

describe('deserializeRequest()', () => {
    test('succeeds if all params are provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            params: { userId: '42' },
        });

        // When
        const result = deserializeGetUserKoaRequest(ctx);

        // Then
        expect(result).toEqual({ userId: 42 });
    });

    test('fails if all params are provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            params: {},
        });

        // When
        const ft = () => deserializeGetUserKoaRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityClientError);
    });
});
