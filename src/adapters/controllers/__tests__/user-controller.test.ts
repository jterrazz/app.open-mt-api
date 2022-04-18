import { NotFoundError } from '@domain/error/client/not-found-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { userControllerFactory } from '@adapters/controllers/user-controller';

jest.mock('../../serializers/user/get-user-koa-serializer', () => ({
    deserializeGetUserKoaRequest: jest.fn().mockReturnValue({}),
    serializeGetUserKoaResponse: jest.fn(),
}));

const createMockOfArgs = () => {
    const mockOfGetUserPublicProfile = jest.fn().mockReturnValue({});
    const mockOfCtx = createMockOfInitiatedKoaContext();

    return {
        mockOfCtx,
        mockOfGetUserPublicProfile,
    };
};

describe('controllers / users', () => {
    describe('getPublicProfile()', () => {
        test('tracks request', async () => {
            // Given
            const { mockOfCtx, mockOfGetUserPublicProfile } =
                createMockOfArgs();

            // When
            await userControllerFactory(
                mockOfGetUserPublicProfile,
            ).getPublicProfile(mockOfCtx);

            // Then
            await expect(
                mockOfCtx.requestTracker.requestedGetUser,
            ).toHaveBeenCalledTimes(1);
        });

        test('fails if no user is found', async () => {
            // Given
            const { mockOfCtx, mockOfGetUserPublicProfile } =
                createMockOfArgs();
            mockOfGetUserPublicProfile.mockReturnValue(null);

            // When
            const ft = () =>
                userControllerFactory(
                    mockOfGetUserPublicProfile,
                ).getPublicProfile(mockOfCtx);

            // Then
            await expect(ft).rejects.toThrow(NotFoundError);
        });
    });
});
