import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';
import { serializeGetUserPublicProfileKoaResponse } from '@adapters/serializers/routes/user/serialize-get-user-public-profile-koa-response';

describe('serializeGetUserPublicProfileKoaResponse()', () => {
    test('returns basic response', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const mockOfUser = createMockOfUser({
            profile: {
                firstName: 'the_first_name',
                lastName: 'the_last_name',
            },
        });

        // When
        serializeGetUserPublicProfileKoaResponse(ctx, mockOfUser);

        // Then
        expect(ctx.body).toEqual({
            firstName: 'the_first_name',
            lastName: 'the_last_name',
        });
    });
});
