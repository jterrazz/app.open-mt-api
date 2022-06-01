import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { getUserPublicProfileControllerFactory } from '@adapters/controllers/user/get-user-public-profile.controller';

const createMockOfArgs = () => {
    return {
        mockOfCtx: createMockOfInitiatedKoaContext(),
        mockOfDeserializer: jest.fn().mockReturnValue({}),
        mockOfGetUserPublicProfile: jest.fn().mockReturnValue({}),
        mockOfSerializer: jest.fn(),
    };
};

describe('getUserPublicProfile()', () => {
    test('tracks request', async () => {
        // Given
        const {
            mockOfCtx,
            mockOfGetUserPublicProfile,
            mockOfDeserializer,
            mockOfSerializer,
        } = createMockOfArgs();

        // When
        await getUserPublicProfileControllerFactory(
            mockOfGetUserPublicProfile,
            mockOfDeserializer,
            mockOfSerializer,
        )(mockOfCtx);

        // Then
        await expect(
            mockOfCtx.requestTracker.requestedGetUserPublicProfile,
        ).toHaveBeenCalledTimes(1);
    });

    test('fails if no user is found', async () => {
        // Given
        const {
            mockOfCtx,
            mockOfGetUserPublicProfile,
            mockOfDeserializer,
            mockOfSerializer,
        } = createMockOfArgs();
        mockOfGetUserPublicProfile.mockReturnValue(null);

        // When
        const ft = () =>
            getUserPublicProfileControllerFactory(
                mockOfGetUserPublicProfile,
                mockOfDeserializer,
                mockOfSerializer,
            )(mockOfCtx);

        // Then
        await expect(ft).rejects.toThrow(NotFoundClientError);
    });
});
